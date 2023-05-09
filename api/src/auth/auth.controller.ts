import { Controller, Post, Request, Body, HttpCode, HttpStatus, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

import { Response } from 'express';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/Login.dto';
import { RefreshTokenGuard } from './guards';

import { Public } from './decorators/public.decorator';

@Controller('api/auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @Public()
  @HttpCode(201)
  async signin(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signin(createUserDto);
  }

  // return the tokens ? anyway need to login after confirmation
  @Post('signin-confirm')
  @Public()
  @HttpCode(200)
  async confirmSignin(@Body() body: { token: string }) {
    const tokens = await this.authService.confirmSignin(body.token)
    return tokens;                                          // WHICH TOKEN TO RETURN AND WHAT TO DO WITH IT/THEM ?
  }
  
  @Post('login')
  @Public()
  @HttpCode(200)
  async login(@Body() login: LoginDto, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.login(login);
    const cookie = `Authentication=${tokens.refreshToken}; HttpOnly; Path=/; Max-Age=172800`;
    response.setHeader('Set-Cookie', cookie);
    return tokens.accessToken;
  }

  /* 
    Protected routes  
  */

  @Post('logout')
  @HttpCode(200)
  async logout(@Request() req: any) {
    this.authService.logout(req.user.id);                   // RETURN SOMETHING ?
  }

  // must pass the last generated refresh-token in order to get a new pair of tokens 
  @Post('refresh')
  @Public()// disables the AccessTokenGuard in order to use the RefreshTokenGuard
  @UseGuards(RefreshTokenGuard)
  @HttpCode(200)
  async refreshToken(@Request() req: any) {
    return this.authService.refreshToken(req.user, req.user.refreshToken);
  }

}


/* 

return `Authentication=${token}; HttpOnly; Path=/; Max-Age=172800`;


Thank you for the tutotial, it's a good one. I just wanted to make a few points. From the security standpoint, the good practice is to have JWT in memory or 
basically sending through http context and save refresh token in an http only cookie so when a user leaves their browser and comes back again, the application 
can uses the refresh token to issue a new access token. But, by using your approach, when a user refreshes their browser or closes it they lose both access and 
refresh tokens and they have to sign in again in order to access the protected area of the application. In SPA applications you use a refresh token in order to 
issue an access token again after its expiration, so we need to keep it somewhere safe to use it again, otherwise it is pointless to use it. 

- have JWT in memory (local storage) or basically sending through http context
- save refresh token in an http only cookie (avoids XSS attacks)

You can store tokens in local storage on the client, however they are open to an XSS attack and with 7 days (for the refresh token), a lot of damage can be done. 
I'd suggest storing the refresh token in an http only cookie. This avoids XSS attacks, as attackers won't be able to get access to the cookie. You should also
add the "/refresh" path to the cookie too, so the cookie is only sent on requests made to the "/refresh" endpoint.
*/