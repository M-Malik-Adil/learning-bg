import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongooseConfig } from './config/mongo.config';
import { MongooseModule } from '@nestjs/mongoose';
import { DbModels } from '../src/model.provider';
import { UserRepository } from '../src/repositories';

@Module({
  imports:[
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useClass: MongooseConfig,
    }),
    MongooseModule.forFeature(DbModels),

  ],
  providers: [UserRepository],
  exports: [
    UserRepository,
    MongooseModule.forFeature(DbModels),
  ],
})
export class SharedModule {}
