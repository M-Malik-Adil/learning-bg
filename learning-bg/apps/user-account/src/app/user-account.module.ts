import { Module } from '@nestjs/common';
import { SharedModule } from '@shared';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserAccountModule {}
