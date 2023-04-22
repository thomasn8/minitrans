import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Element } from './entities/element.entity';
import { ElementsService } from './elements.service';

@Module({
	imports: [TypeOrmModule.forFeature([Element])],
	exports: [TypeOrmModule],
	providers: [ElementsService],
})
export class ElementsModule {}
