import { Module } from '@nestjs/common';

import { UserController } from './controllers/user.controller';

import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '@shared';
@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
  ],
  controllers: [UserController],
  providers: [],
})
export class UserAccountModule {}
