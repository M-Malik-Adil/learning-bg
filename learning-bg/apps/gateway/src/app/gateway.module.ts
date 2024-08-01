import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigService } from './config/winston.config';
import {LoggerMiddleware} from './middleware/logger.middleware';
import { ALL_SERVICE_PROVIDERS } from '../assets/factory/factory';
import { PublicGatewayModule } from './public.gateway.module';
import { SERVICES } from '@shared/constants';
import { HealthCheckController } from './controllers/health-check.controller';



@Module({
    imports: [
        EventEmitterModule.forRoot(),
        ConfigModule.forRoot(),
        WinstonModule.forRootAsync({
            useClass:WinstonConfigService
        }),
        PublicGatewayModule
    ],
    controllers: [HealthCheckController],
    providers: [
        ALL_SERVICE_PROVIDERS,
        ...Object.values(SERVICES).map((SERVICE_NAME) => {
            return {
              provide: SERVICE_NAME,
              useFactory: (config: ConfigService) => {
                return ClientProxyFactory.create({
                  transport: Transport.RMQ,
                  options: {
                    urls: [config.get('RABBITMQ_HOST')],
                    queue: `${SERVICE_NAME}_QUEUE`,
                    prefetchCount: 1,
                    queueOptions: {
                      durable: false,
                    },
                  },
                });
              },
              inject: [ConfigService],
            };
          }),
    ],    

})
export class GatewayModule implements NestModule {
    constructor(private configService: ConfigService) {}

    configure(consumer: MiddlewareConsumer) {
        if(this.configService.get('NODE_ENV') !== 'production') {
            consumer.apply(LoggerMiddleware).forRoutes('*');
        }
        consumer.apply(LoggerMiddleware).exclude('healthcheck(.*)').forRoutes('*');
    }

}