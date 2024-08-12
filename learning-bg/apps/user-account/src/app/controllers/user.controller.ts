import { Controller,  } from '@nestjs/common';


import { MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@shared/constants';
import {CreateUserDto} from '@shared/dto'
import { UserService } from '../services/user.service';

@Controller()
export class UserController {

  constructor(
    private readonly userService: UserService
  ) {}
  
  @MessagePattern(RMQ_MESSAGES.HEALTH.HEALTH_CHECK)
  async healthCheck() {
    return {
      healthCheckPassed: true,
      healthCheck: 'Excellent',
    };
  }

  @MessagePattern(RMQ_MESSAGES.USER.CREATE)
  async createUser(@Payload() payload: CreateUserDto) {
    const cognitUser = await this.userService.create(payload)  
   return cognitUser
  }

  
}
