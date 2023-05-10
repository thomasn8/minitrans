import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import { UserDto } from 'src/_shared_dto/user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/Login.dto';
import { TokensDto } from './dto/tokens.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { createHmac } from 'crypto';

@Injectable()
export class AuthService {

	constructor(
		private userService: UsersService,
		private jwtService: JwtService
	) {}


	async signin(createUserDto: CreateUserDto): Promise<string> {
		return await this.userService.create(createUserDto);
	}


	async confirmSignin(confirmToken: string): Promise<string> {
		const decoded = await this.jwtService.verifyAsync(confirmToken, { secret: process.env.EMAILCONFIRM_TOKEN_SECRET }).catch((err: any) => {
			console.log(err);
			throw new UnauthorizedException('Email confirmation error: token not valid');
		})

		const tokenRegistered = await this.userService.getConfirmToken(decoded.email);

		if (tokenRegistered === '')
			throw new UnauthorizedException('Email confirmation error: already confirmed');

		if (tokenRegistered && tokenRegistered === confirmToken) {
			await this.userService.confirmUser(decoded.email);
			return 'Signed in confirmed';
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


	async logout(userId: number): Promise<string> {
		await this.userService.updateRefreshToken(userId, '');
		return 'Logout success';
	}


	async refreshTokens(user: any, refreshToken: string) {
		const rtRegistered = await this.userService.findRefreshToken(user.id);

		if (!rtRegistered)
			throw new UnauthorizedException('Unauthorized');

		const salt: string | undefined = process.env.REFRESHTOKEN_SALT;
		if (!salt)
			throw new InternalServerErrorException('Token error 1');
		const hash = createHmac('sha256', salt).update(refreshToken).digest('hex');

		if (hash !== rtRegistered) {
			// this.logout(user.id)
			// send warning email to the user to prevent it from potential attack on his account
			throw new UnauthorizedException('Unauthorized');
		}

		return this.updateTokens(user);
	}


	async updateTokens(user: UserDto): Promise<TokensDto> {
		const tokens = await this.getTokens(user);
		const salt: string | undefined = process.env.REFRESHTOKEN_SALT;
		if (!salt)
			throw new InternalServerErrorException('Token error 2');		
		const hash = createHmac('sha256', salt).update(tokens.refreshToken).digest('hex');
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
					expiresIn: process.env.ACCESSTOKEN_DURATION,
					// expiresIn: 1,																			// test purpose
				}
			),
			this.jwtService.signAsync({
					id: user.id,
					email: user.email,
					pseudo: user.pseudo,
					element: user.element
				}, {
					secret: process.env.REFRESHTOKEN_SECRET,
					expiresIn: process.env.REFRESHTOKEN_DURATION,
					// expiresIn: 5,																			// test purpose
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

	// get expire date from env or set it to 1 day if not provided in env
	getExpireDate(): Date {
		let ms: number;
    process.env.REFRESHTOKEN_DURATION_SEC ? ms = parseInt(process.env.REFRESHTOKEN_DURATION_SEC) * 1000 : ms = 86400000;
    return new Date(Date.now() + ms);
	}

}
