import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Element } from 'src/elements/entities/element.entity';

import { Factions } from './factions/Factions';

import { EmailService } from 'src/email/email.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private emailService: EmailService,
  ) {}

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

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

  // ENVOYER EMAIL DE CONFIRMATION (lien avec randomstring qui pointe sur un endpoint special) + AVEC PSEUDO + NOM DE FACTION
  async create(createUserDto: CreateUserDto) {
    
    // user data from body 
    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    // faction datas determined by user responses
    const factions: Factions = new Factions(); 
    const elementId = factions.identifyUser(createUserDto.questions);
    const element = new Element(elementId);
    user.element = element;
    let pseudo: string = '';
    while ( pseudo === '' || (await this.pseudoExist(pseudo) === true) ) {
      pseudo = factions.generatePseudo(elementId);
    }
    user.pseudo = pseudo;

    // token to use in the url of confirmation
    const confirmToken: string = 'test';          // GENERATE A JWT OR A RANDOMSTRING
    user.confirmationToken = confirmToken;

    // save in db
    this.usersRepository.save(user).catch((err) => {
      throw new BadRequestException('User creation error:', err);
    })

    await this.emailService.sendConfirmationLink(user, confirmToken);

    return 'Signed in success';
  }

}
