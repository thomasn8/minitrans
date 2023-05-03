import { Injectable, Inject, forwardRef, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Tokens } from './tokens/tokens.interface';
import { JwtService } from '@nestjs/jwt';

interface ReqUser{
	id: number;
	email: string;
	pseudo: string;
	element: string;
}

@Injectable()
export class AuthService {

	constructor(
		@Inject(forwardRef(() => UsersService))
		private userService: UsersService,
		private jwtService: JwtService
	) {}

	async getAccessToken(user: ReqUser): Promise<{ accessToken: string }> {
		const accessToken = await this.jwtService.signAsync({
				sub: user.id,
				email: user.email,
				pseudo: user.pseudo,
				element: user.element
			}, {
				secret: process.env.ACCESSTOKEN_SECRET,
				expiresIn: 60 * 15,
			}
		);
		return { accessToken: accessToken };
	}

	async getTokens(user: ReqUser): Promise<Tokens> {
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
					pseudo: user.pseudo,
					element: user.element
				}, {
					secret: process.env.REFRESHTOKEN_SECRET,
					expiresIn: 60 * 60 * 24 * 7,
				}
			),
		])
		return { 
			accessToken: accessToken, 
			refreshToken: refreshToken 
		};
	}

	async signin(createUserDto: CreateUserDto) {
		return await this.userService.create(createUserDto);
	}

	async confirmSignin(email: string, confirmToken: string): Promise<Tokens> {
		// get the confirmToken from url and compare it to the confirmToken from db
		const tokenDb = await this.userService.getConfirmToken(email).catch((err) => {
			console.log(err);
			throw new NotFoundException('User not found');
		});
		
		if (tokenDb) {
			// confirmation = true
			// confirmationToken = ''
			// confirmationDate = Date()

			// ...
		}

		// 
		const tokens: Tokens = {
			accessToken: 'asdf',
			refreshToken: 'fasdf'
		}
		return tokens;
	}

	login() {

	}

	logout() {

	}

	refreshToken() {

	}

}
