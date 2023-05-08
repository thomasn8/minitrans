import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import { UserDto } from 'src/_shared_dto/user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/Login.dto';
import { TokensDto } from './dto/tokens.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { createHmac } from 'crypto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {

	constructor(
		private userService: UsersService,
		private jwtService: JwtService
	) {}

	// async getAccessToken(user: ReqUser): Promise<{ accessToken: string }> {
	// 	const accessToken = await this.jwtService.signAsync({
	// 			id: user.id,
	// 			email: user.email,
	// 			pseudo: user.pseudo,
	// 			element: user.element
	// 		}, {
	// 			secret: process.env.ACCESSTOKEN_SECRET,
	// 			expiresIn: "1h",
	// 		}
	// 	);
	// 	return { accessToken: accessToken };
	// }


	async signin(createUserDto: CreateUserDto) {
		return await this.userService.create(createUserDto);
	}


	async confirmSignin(confirmToken: string): Promise<TokensDto> {
		const decoded = await this.jwtService.verifyAsync(confirmToken, { secret: process.env.EMAILCONFIRM_TOKEN_SECRET }).catch((err: any) => {
			console.log(err);
			throw new UnauthorizedException('Email confirmation error: token not valid');
		})

		const tokenRegistered = await this.userService.getConfirmToken(decoded.email);

		if (tokenRegistered === '')
			throw new UnauthorizedException('Email confirmation error: already confirmed');

		if (tokenRegistered && tokenRegistered === confirmToken) {
			const user: UserDto = await this.userService.confirmUser(decoded.email);
			return this.updateTokens(user);
		}
		else
			throw new UnauthorizedException('Email confirmation error: token not valid');
	}


	async login(login: LoginDto) {
		const user = await this.userService.findLogin(login.email).catch(() => {
			throw new UnauthorizedException('Login incorrect');
		})
		
		const passwordMatch = await bcrypt.compare(login.password, user.password);
		if (passwordMatch === false)
			throw new UnauthorizedException('Login incorrect');

		const userToLogin: UserDto = {
			id: user.id,
			email: user.email,
			pseudo: user.pseudo,
			element: user.element.name
		}
		return this.updateTokens(userToLogin);
	}


	async logout(userId: number) {
		await this.userService.updateRefreshToken(userId, '');
	}


	async refreshToken(user: any, refreshToken: string) {
		const rtRegistered = await this.userService.findRefreshToken(user.id);

		if (!rtRegistered)
			throw new UnauthorizedException('Unauthorized');

		const hash = createHmac('sha256', 'secret').update(refreshToken).digest('hex');
		if (hash !== rtRegistered) {
			// this.logout(user.id)
			// send warning email to the user to prevent it from potential attack on his account
			throw new UnauthorizedException('Unauthorized');
		}

		return this.updateTokens(user);
	}


	async updateTokens(user: UserDto): Promise<TokensDto> {
		const tokens = await this.getTokens(user);
		const hash = createHmac('sha256', 'secret').update(tokens.refreshToken).digest('hex');
		await this.userService.updateRefreshToken(user.id, hash);
		return tokens;
	}


	async getTokens(user: UserDto): Promise<TokensDto> {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync({
					id: user.id,
					email: user.email,
					pseudo: user.pseudo,
					element: user.element
				}, {
					secret: process.env.ACCESSTOKEN_SECRET,
					expiresIn: "1h",
				}
			),
			this.jwtService.signAsync({
					id: user.id,
					email: user.email,
					pseudo: user.pseudo,
					element: user.element
				}, {
					secret: process.env.REFRESHTOKEN_SECRET,
					expiresIn: 2,
					// expiresIn: 60 * 60 * 24 * 2,
				}
			),
		]).catch((err) => {
			console.log(err);
			throw new InternalServerErrorException('Tokens creation error');
		})
		return { 
			accessToken: accessToken, 
			refreshToken: refreshToken 
		};
	}


}
