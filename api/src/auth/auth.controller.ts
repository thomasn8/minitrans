import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  // POST confirm-signin
  // POST login

  // @Post('login')
  // async login(@Request() req: any): Promise<any> {
  //   return this.authService.login(req.user);
  // }

}
