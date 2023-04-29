import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import config from './_typeorm/ormconfig';

import { ChatModule } from './chat/chat.module';
import { UsersModule } from './users/users.module';
import { ElementsModule } from './elements/elements.module';

import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(config), 
    UsersModule,
    ChatModule,
    ElementsModule,
    EmailModule,
    // ConfigModule.forRoot({
    //   isGlobal: true, // no need to import into other modules
    // }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
