import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from 'express';


@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Authentication;
      }]),
      secretOrKey: process.env.REFRESHTOKEN_SECRET,
			passReqToCallback: true
    });
  }
 
	validate(request: Request, payload: any) {
		const refreshToken = request?.cookies?.Authentication;
		return {
			...payload,
			refreshToken,
		};
	}

}