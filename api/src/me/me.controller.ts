import { Controller, Get, Request } from '@nestjs/common';
import { UserDto } from 'src/_shared_dto/user.dto';

@Controller('api/me')
export class MeController {

  @Get()
  getMe(@Request() req: any): UserDto {
    return req.user as UserDto;
  }
  
}
