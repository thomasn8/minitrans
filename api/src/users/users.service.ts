import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto, QuestionsDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Element } from 'src/elements/entities/element.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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

  // GENERER UN PSEUDO RANDOM QUE LE USER PEUT CHANGER
  // ENVOYER EMAIL DE CONFIRMATION (lien avec randomstring qui pointe sur un endpoint special) + AVEC PSEUDO + NOM DE FACTION
  async create(createUserDto: CreateUserDto) {
   
    console.log(createUserDto);
    
    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.pseudo = 'test';

    const elementId = this.identifyUser(createUserDto.questions);
    const element = new Element(elementId);
    user.element = element;

    this.usersRepository.save(user).catch((err) => {
      throw new BadRequestException('User creation error:', err);
    })
    return 'Signed in success';
  }

  // Get user Faction based on questionaire responses
  identifyUser(questions: QuestionsDto) {
    let water = 0;
    let desert = 0;
    let forest = 0;
    let cosmos = 0;

    switch (questions.question1) {
      case 1:
        water+=2;desert+=4;forest+=3;cosmos+=1;
        break;
      case 2:
        water+=3;desert+=4;forest+=1;cosmos+=2;
        break;
      case 3:
        water+=1;desert+=3;forest+=2;cosmos+=4;
        break;
      case 4:
        water+=3;desert+=1;forest+=4;cosmos+=2;
        break;
    }

    switch (questions.question2) {
      case 1:
        water+=2;desert+=1;forest+=3;cosmos+=4;
        break;
      case 2:
        water+=4;desert+=1;forest+=3;cosmos+=2;
        break;
      case 3:
        water+=2;desert+=4;forest+=3;cosmos+=1;
        break;
      case 4:
        water+=4;desert+=1;forest+=2;cosmos+=3;
        break;
    }

    switch (questions.question3) {
      case 1:
        water+=4;desert+=2;forest+=1;cosmos+=3;
        break;
      case 2:
        water+=1;desert+=4;forest+=3;cosmos+=2;
        break;
      case 3:
        water+=1;desert+=4;forest+=3;cosmos+=2;
        break;
      case 4:
        water+=3;desert+=2;forest+=1;cosmos+=4;
        break;
    }

    switch (questions.question4) {
      case 1:
        water+=4;desert+=2;forest+=1;cosmos+=3;
        break;
      case 2:
        water+=1;desert+=4;forest+=3;cosmos+=2;
        break;
      case 3:
        water+=2;desert+=3;forest+=4;cosmos+=1;
        break;
      case 4:
        water+=3;desert+=2;forest+=1;cosmos+=4;
        break;
    }

    switch (questions.question5) {
      case 1:
        water+=2;desert+=4;forest+=3;cosmos+=1;
        break;
      case 2:
        water+=1;desert+=2;forest+=4;cosmos+=3;
        break;
      case 3:
        water+=3;desert+=1;forest+=2;cosmos+=4;
        break;
      case 4:
        water+=4;desert+=1;forest+=3;cosmos+=2;
        break;
    }

    const sums = {
      water: water,
      desert: desert,
      forest: forest,
      cosmos: cosmos,
    }
    console.log('sum:', sums);

    const max: number = Math.max(water, desert, forest, cosmos);

    if (max < 14)
      return Element.UNKNOWN;

    let elements: number[] = [];
    if (max === water) {
      elements.push(Element.WATER);
    }
    if (max === desert) {
      elements.push(Element.DESERT);
    }
    if (max === forest) {
      elements.push(Element.FOREST);
    }
    if (max === cosmos) {
      elements.push(Element.COSMOS);
    }

    if (elements.length > 1)
      return Element.UNKNOWN;

    return elements[0];
  }

}
