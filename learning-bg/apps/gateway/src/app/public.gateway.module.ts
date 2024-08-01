import { Module } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EventEmitterModule } from '@nestjs/event-emitter';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigService } from './config/winston.config';
import { ALL_SERVICE_PROVIDERS } from '../assets/factory/factory';
import { SERVICES } from '@shared/constants';

@Module({
    imports: [
        EventEmitterModule.forRoot(),
        ConfigModule.forRoot(),
        WinstonModule.forRootAsync({
            useClass:WinstonConfigService
        })
    ],
    controllers: [],
    providers: [
        ALL_SERVICE_PROVIDERS,
        ...Object.values(SERVICES).map((SERVICE_NAME) => {
            return {
                provide:SERVICE_NAME,
                useFactory:(config:ConfigService) => {
                    return  ClientProxyFactory.create({
                        transport: Transport.RMQ,
                        options: {
                            urls: [config.get('RABBITMQ_HOST')],
                            queue: `${SERVICE_NAME}_QUEUE`,
                            queueOptions: {
                                durable: false
                            }
                        }
                    })
                }, 
                inject: [ConfigService],
            };
        }),
    ],
})
export class PublicGatewayModule {}