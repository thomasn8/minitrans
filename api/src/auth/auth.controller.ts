import { Controller, Get, Post, Request, Body, Param, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Tokens } from './tokens/tokens.interface';

@Controller('api/auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  // local/signup
  @Post('signin')
  async signin(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signin(createUserDto);
  }

  // local/signup
  @Get('signin-confirm')
  async confirmSignin(@Request() req: any, @Query('token') confirmToken: string): Promise<Tokens> {
    return await this.authService.confirmSignin(req.email, confirmToken);
  }
  
  // local/signin
  @Post('login')
  async login(@Request() req: any) {
    this.authService.login();
  }

  // logout
  @Post('logout')
  async logout(@Request() req: any) {
    this.authService.logout();
  }

  // refresh
  @Post('refresh')
  async refreshToken(@Request() req: any) {
    this.authService.refreshToken();
  }

}
