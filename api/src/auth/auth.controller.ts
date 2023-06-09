import { Controller, Get, Post, Request, Body, HttpCode, UnauthorizedException, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

import { Response, response } from 'express';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/Login.dto';
import { RefreshTokenGuard } from './guards';

import { Public } from './decorators/public.decorator';

@Controller('api/auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  /* 
    Public routes  
  */

  @Post('signin')
  @Public()
  @HttpCode(201)
  async signin(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signin(createUserDto);
  }

  @Post('signin-confirm')
  @Public()
  @HttpCode(200)
  async confirmSignin(@Body() body: { token: string }) {
    return await this.authService.confirmSignin(body.token)
  }
  
  @Post('login')
  @Public()
  @HttpCode(200)
  async login(@Body() login: LoginDto, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.login(login);
    response.cookie('Authentication', tokens.refreshToken, { expires: this.authService.getExpireDate(), httpOnly: true });
    return tokens.accessToken;
  }


  /* 
    Protected routes  
  */

  @Get('logout')
  @Public()                     // disables the global AccessTokenGuard to use instead the RefreshTokenGuard
  @UseGuards(RefreshTokenGuard) // get the refresh token set from the cookies
  @HttpCode(200)
  async logout(@Request() req: any, @Res({ passthrough: true }) response: Response) {
    response.clearCookie('Authentication');
    return await this.authService.logout(req.user.id);
  }

  @Get('refresh')
  @Public()                     // disables the global AccessTokenGuard to use instead the RefreshTokenGuard
  @UseGuards(RefreshTokenGuard) // get the refresh token set from the cookies
  @HttpCode(200)
  async refreshTokens(@Request() req: any, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.refreshTokens(req.user, req.user.refreshToken);
    response.cookie('Authentication', tokens.refreshToken, { expires: this.authService.getExpireDate(), httpOnly: true });
    return tokens.accessToken;
  }

}
