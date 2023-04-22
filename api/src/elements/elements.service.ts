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

	async initRepo() {
		const element1 = new Element('Water', 'blue', '100, 148, 237', '6494ed');
		const element2 = new Element('Desert', 'orange', '239, 126, 33', 'ef7e21');
		const element3 = new Element('Forest', 'green', '93, 213, 18', '5dd512');
		const element4 = new Element('Mutation', 'purple', '163, 76, 255', 'a34cff');
		// const element1 = new Element(1, 'Water', 'blue', '100, 148, 237', '6494ed');
		// const element2 = new Element(2, 'Desert', 'orange', '239, 126, 33', 'ef7e21');
		// const element3 = new Element(3, 'Forest', 'green', '93, 213, 18', '5dd512');
		// const element4 = new Element(4, 'Mutation', 'purple', '163, 76, 255', 'a34cff');
		await this.elementsRepository.save(element1);
		await this.elementsRepository.save(element2);
		await this.elementsRepository.save(element3);
		await this.elementsRepository.save(element4);
	}

}
