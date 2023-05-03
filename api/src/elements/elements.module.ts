import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Element } from './entities/element.entity';
import { ElementsService } from './elements.service';

@Module({
	imports: [TypeOrmModule.forFeature([Element])],
	providers: [ElementsService],
	exports: [TypeOrmModule, ElementsService],
})
export class ElementsModule {}
