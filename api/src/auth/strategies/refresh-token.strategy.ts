// import { Injectable } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { ExtractJwt, Strategy } from "passport-jwt";
// import { Request } from "express";

// @Injectable()
// export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
// 	constructor() {
// 		super({
// 			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// 			secretOrKey: process.env.REFRESHTOKEN_SECRET,
// 			passReqToCallback: true
// 		})
// 	}

// 	validate(req: Request, payload: any) {
// 		const refreshToken = req.get('authorization')?.replace('Bearer', '').trim();
// 		return {
// 			...payload,
// 			refreshToken,
// 		};
// 	}
// }

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.REFRESHTOKEN_SECRET
		})
	}

	validate(payload: any) {
		return payload;	// does this: req.user = payload
	}
}