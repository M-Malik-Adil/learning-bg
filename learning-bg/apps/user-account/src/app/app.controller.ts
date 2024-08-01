import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @MessagePattern(RMQ_MESSAGES.HEALTH.HEALTH_CHECK)
  async healthCheck() {
    return {
      healthCheckPassed: true,
      healthCheck: 'Excellent',
    };
  }

  @Get()
  getData() {
    return this.appService.getData();
  }
}
