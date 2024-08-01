import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigService } from './config/winston.config';
import {LoggerMiddleware} from './middleware/logger.middleware';
import { ALL_SERVICE_PROVIDERS } from '../assets/factory/factory';



@Module({
    imports: [
        EventEmitterModule.forRoot(),
        ConfigModule.forRoot(),
        WinstonModule.forRootAsync({
            useClass:WinstonConfigService
        })
    ],
    controllers: [],
    providers: [ALL_SERVICE_PROVIDERS],    

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