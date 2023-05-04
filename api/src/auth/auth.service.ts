import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import { UserDto } from 'src/_shared_dto/user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Tokens } from './tokens/tokens.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

	constructor(
		private userService: UsersService,
		private jwtService: JwtService
	) {}

	// async getAccessToken(user: ReqUser): Promise<{ accessToken: string }> {
	// 	const accessToken = await this.jwtService.signAsync({
	// 			sub: user.id,
	// 			email: user.email,
	// 			pseudo: user.pseudo,
	// 			element: user.element
	// 		}, {
	// 			secret: process.env.ACCESSTOKEN_SECRET,
	// 			expiresIn: 60 * 15,
	// 		}
	// 	);
	// 	return { accessToken: accessToken };
	// }

	async getTokens(user: UserDto): Promise<Tokens> {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync({
					sub: user.id,
					email: user.email,
					pseudo: user.pseudo,
					element: user.element
				}, {
					secret: process.env.ACCESSTOKEN_SECRET,
					expiresIn: 60 * 15,
				}
			),
			this.jwtService.signAsync({
					sub: user.id,
					email: user.email,
					// pseudo: user.pseudo,
					// element: user.element
				}, {
					secret: process.env.REFRESHTOKEN_SECRET,
					expiresIn: 60 * 60 * 24 * 7,
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

	async signin(createUserDto: CreateUserDto) {
		return await this.userService.create(createUserDto);
	}

	async confirmSignin(confirmToken: string): Promise<Tokens> {
		const decoded = await this.jwtService.verifyAsync(confirmToken, { secret: process.env.EMAILCONFIRM_TOKEN_SECRET }).catch((err:any) => {
			console.log(err);
			throw new UnauthorizedException('Email confirmation error: token not valid');
		})

		const tokenRegisterd = await this.userService.getConfirmToken(decoded.email);
		
		if (tokenRegisterd && tokenRegisterd === confirmToken) {
			const user: UserDto = await this.userService.confirmUser(decoded.email);
			console.log(user);
			const tokens = await this.getTokens(user);
			await this.userService.updateRefreshToken(user.id, tokens.refreshToken);
			return tokens;
		}
		else
			throw new UnauthorizedException('Email confirmation error: token not valid');
	}

	login() {

	}

	logout() {

	}

	refreshToken() {

	}

}
