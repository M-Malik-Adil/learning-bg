/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {  ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SERVICES } from '@shared/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport:Transport.RMQ,
      options:{
        urls:[process.env.RABBITMQ_HOST],
        queue: `${SERVICES.USER}_QUEUE`,
        queueOptions:{
          durable: false
        }
      }
    }
  );
 
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),

  );

  await app.listen();

}

bootstrap();
