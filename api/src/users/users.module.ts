import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { EmailModule } from 'src/email/email.module';
import { AuthModule } from 'src/auth/auth.module';
import { ElementsModule } from 'src/elements/elements.module';

@Module({
	imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule), EmailModule, ElementsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
