import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { TypeOrmModule } from '@nestjs/typeorm';
import config from './_typeorm/ormconfig';

import { ChatModule } from './chat/chat.module';
import { UsersModule } from './users/users.module';
import { ElementsModule } from './elements/elements.module';

import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './auth/guards';

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
  providers: [{
    provide: APP_GUARD,
    useClass: AccessTokenGuard
  }],
})
export class AppModule { }
