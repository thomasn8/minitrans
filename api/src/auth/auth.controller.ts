import { Controller, Get, Post, Request, Body, HttpCode, HttpStatus, UseGuards, Res } from '@nestjs/common';
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
    return tokens; // WHICH TOKEN TO RETURN AND WHAT TO DO WITH IT/THEM ?
  }
  
  @Post('login')
  @Public()
  @HttpCode(200)
  async login(@Body() login: LoginDto, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.login(login);
    const cookie = `Authentication=${tokens.refreshToken}; HttpOnly; Path=/; Max-Age=172800`;
    response.setHeader('Set-Cookie', cookie);
    console.log('new rt set in cookie:', tokens.refreshToken);
    return tokens.accessToken;
  }

  /* 
    Protected routes  
  */

  @Post('logout')
  @HttpCode(200)
  async logout(@Request() req: any) {
    this.authService.logout(req.user.id); // RETURN SOMETHING ?
  }

  // get the refresh token set from the cookies
  @Get('refresh')
  @Public()// disables the AccessTokenGuard in order to use the RefreshTokenGuard
  @UseGuards(RefreshTokenGuard)
  @HttpCode(200)
  async refreshToken(@Request() req: any, @Res({ passthrough: true }) response: Response) {
    const headers: string[] = req.rawHeaders;
    const index = headers.findIndex((header) => header === 'Cookie') + 1;
    const rtFromCookie = headers[index].substring(headers[index].indexOf('=') + 1);
    console.log('rt get from cookie',rtFromCookie);

    const tokens = await this.authService.refreshToken(req.user, rtFromCookie);
    // const tokens = await this.authService.refreshToken(req.user, req.user.refreshToken);
    const cookie = `Authentication=${tokens.refreshToken}; HttpOnly; Path=/; Max-Age=172800`;
    response.setHeader('Set-Cookie', cookie);
    console.log('new rt set in cookie:', tokens.refreshToken);
    return tokens.accessToken;
  }

}
