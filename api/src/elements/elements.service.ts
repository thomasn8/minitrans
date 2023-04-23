import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Element } from './entities/element.entity';

@Injectable()
export class ElementsService {

	constructor(
    @InjectRepository(Element)
    private elementsRepository: Repository<Element>,
  ) {}

}
