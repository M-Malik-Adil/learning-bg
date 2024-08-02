import { Controller,  } from '@nestjs/common';


import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {CreateUserDto} from '@shared/dto'
@Controller()
export class UserController {
  
  @MessagePattern(RMQ_MESSAGES.HEALTH.HEALTH_CHECK)
  async healthCheck() {
    return {
      healthCheckPassed: true,
      healthCheck: 'Excellent',
    };
  }

  @MessagePattern(RMQ_MESSAGES.USER.CREATE)
  async createUser(@Payload() payload: CreateUserDto) {
    return {
      message: 'User created successfully',
    };
  }

  
}
