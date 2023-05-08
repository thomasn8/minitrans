import { Controller, Post, Request, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

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
  async login(@Body() login: LoginDto) {
    const tokens = await this.authService.login(login);
    return tokens;                                          // WHICH TOKEN TO RETURN AND WHAT TO DO WITH IT/THEM ?
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Request() req: any) {
    this.authService.logout(req.user.id);                   // RETURN SOMETHING ?
  }

  // MUST PASS THE LAST GENERATED REFRESH-TOKEN IN ORDER TO GET A NEW PAIR OF TOKENS 
  @Post('refresh')
  @Public()// disables the AccessTokenGuard in order to use the RefreshTokenGuard
  @UseGuards(RefreshTokenGuard)
  @HttpCode(200)
  async refreshToken(@Request() req: any) {
    return this.authService.refreshToken(req.user, req.user.refreshToken);
  }

}


