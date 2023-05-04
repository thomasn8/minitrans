import { Injectable, BadRequestException, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from 'src/_shared_dto/user.dto';

import { Element } from 'src/elements/entities/element.entity';
import { Factions } from './factions/Factions';

import { EmailService } from 'src/email/email.service';
import { ElementsService } from 'src/elements/elements.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private emailService: EmailService,
    private elementService: ElementsService,
    private jwtService: JwtService
  ) {}

  async saveUser(user: User, errorMsg: string) {
    await this.usersRepository.save(user).catch((err) => {
      console.log(err);
      throw new InternalServerErrorException(errorMsg);
    });
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // async findOne(errorMsg: string, id?: number, email?: string) {
  //   try {
  //     if (id) {
  //       return await this.usersRepository.findOneOrFail({
  //         where: { id: id },
  //       })
  //     }
  //     else {
  //       return await this.usersRepository.findOneOrFail({
  //         where: { email: email },
  //       })
  //     }
  //   } catch (err) {
  //     console.log(err);
	// 		throw new NotFoundException(errorMsg);
  //   }
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  async emailExist(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { email: email }
    })
    if (user)
      return true;
    return false;
  }

  async pseudoExist(pseudo: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { pseudo: pseudo }
    })
    if (user)
      return true;
    return false;
  }

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    
    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    const factions: Factions = new Factions(); 
    const elementId = factions.identifyUser(createUserDto.questions);
    const element = new Element(elementId);
    user.element = element;
    let pseudo: string = '';
    while ( pseudo === '' || (await this.pseudoExist(pseudo) === true) ) {
      pseudo = factions.generatePseudo(elementId);
    }
    user.pseudo = pseudo;
    const confirmToken = await this.jwtService.signAsync({
        email: user.email,
      }, {
        secret: process.env.EMAILCONFIRM_TOKEN_SECRET,
        expiresIn: 60 * 60 * 24, // 2 hours to confirm
      }
    );
    user.confirmationDate = null;
    user.confirmationToken = confirmToken;
    await this.saveUser(user, 'User creation error');

    const elementName = this.elementService.getElement(elementId)
    await this.emailService.sendConfirmationLink(user, elementName, confirmToken);

    return 'Signed in success';
  }

  async getConfirmToken(email: string): Promise<string>  {
    const user = await this.usersRepository.findOneOrFail({
      where: { email: email },
      select: ['confirmationToken']
    }).catch((err) => {
      console.log(err);
      throw new NotFoundException('User not found');
    });

    return user.confirmationToken;
  }

  async confirmUser(email: string): Promise<UserDto> {
    const user = await this.usersRepository.findOneOrFail({
      where: { email: email },
      relations: { element: true }
    }).catch((err) => {
      console.log(err);
			throw new NotFoundException('User not found');
    });

    user.confirmation = true;
    user.confirmationToken = '';
    user.confirmationDate = new Date();
    await this.saveUser(user, 'User confirmation error');

    return {
      id: user.id,
      email: user.email,
      pseudo: user.pseudo,
      element: user.element.name
    };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.usersRepository.findOneOrFail({
      where: { id: userId },
    }).catch((err) => {
      console.log(err);
			throw new NotFoundException('User not found');
    });

    user.refreshToken = refreshToken;
    await this.saveUser(user, 'User confirmation error');
  }

}
