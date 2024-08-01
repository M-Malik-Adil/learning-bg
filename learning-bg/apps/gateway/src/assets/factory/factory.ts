import { ClientRMQ } from '@nestjs/microservices';

export enum SERVICES {
    EXAMPLE_MICROSERVICE = 'EXAMPLE_MICROSERVICE_SERVICE',
  }

export const MICRO_SERVICES = Object.values(SERVICES);
export const ALL_SERVICE_PROVIDERS = {
    provide: 'MICRO_SERVICES',
    useFactory: (...svcClients: ClientRMQ[]) => svcClients,
    inject: MICRO_SERVICES,
  };