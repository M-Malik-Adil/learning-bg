import { ClientRMQ } from '@nestjs/microservices';
import { SERVICES } from '@shared/constants';


export const MICRO_SERVICES = Object.values(SERVICES);
export const ALL_SERVICE_PROVIDERS = {
    provide: 'MICRO_SERVICES',
    useFactory: (...svcClients: ClientRMQ[]) => svcClients,
    inject: MICRO_SERVICES,
  };