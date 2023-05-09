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


