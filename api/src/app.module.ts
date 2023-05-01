import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import config from './_typeorm/ormconfig';

import { ChatModule } from './chat/chat.module';
import { UsersModule } from './users/users.module';
import { ElementsModule } from './elements/elements.module';

import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config), 
    UsersModule,
    ChatModule,
    ElementsModule,
    EmailModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
