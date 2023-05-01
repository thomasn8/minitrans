import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {

	constructor(private userService: UsersService) {}

	signin(createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	confirmSignin() {
		
	}

	login() {

	}

	logout() {

	}

	refreshToken() {

	}

}
