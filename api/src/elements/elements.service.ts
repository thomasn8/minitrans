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

  getElement(id: number) {
    switch (id) {
      case 1:
        return 'Water'
      case 2:
        return 'Desert'
      case 3:
        return 'Forest'
      case 4:
        return 'Cosmos'
      case 5:
        return 'Unknown'
    
      default:
        return 'Unknown';
    }
  }
  
}
