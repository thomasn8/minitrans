import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.REFRESHTOKEN_SECRET,
			passReqToCallback: true // need to hash the token to store it
		})
	}

	validate(req: Request, payload: any) {
		const refreshToken = req.get('authorization')?.replace('Bearer', '').trim();
		return {
			...payload,
			refreshToken,
		};
	}
}