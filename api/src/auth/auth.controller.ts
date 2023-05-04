import { Controller, Post, Request, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('api/auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  /* 
  PUBLIC ROUTES
  */

  @Post('signin')
  async signin(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signin(createUserDto);
  }

  @Post('signin-confirm')
  async confirmSignin(@Body() body: { token: string }) {

    // make use of the token for the new user (store where ? headers ?)
    const tokens = await this.authService.confirmSignin(body.token)
    return tokens;
  }
  
  @Post('login')
  async login(@Request() req: any) {
    this.authService.login();
  }


  /* 
  LOGGEDIN ROUTES
  */

  @Post('logout')
  async logout(@Request() req: any) {
    this.authService.logout();
  }

  @Post('refresh')
  async refreshToken(@Request() req: any) {
    this.authService.refreshToken();
  }

}
