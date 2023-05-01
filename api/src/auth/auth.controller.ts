import { Controller, Post, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('api/auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  // local/signup
  @Post('signin')
  async signin(@Body() createUserDto: CreateUserDto) {
    return this.authService.signin(createUserDto);
  }

  // local/signup
  @Post('signin-confirm')
  async confirmSignin(@Request() req: any) {
    this.authService.confirmSignin();
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
