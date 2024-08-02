import { Controller, Inject, Post, Body, Req } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { API_ENDPOINTS, API_TAGS, CONTROLLERS, RMQ_MESSAGES, SERVICES } from "@shared/constants";
import { AddAdminUserResponseDto, CreateUserDto } from "@shared/dto";

import {AppRequest} from '../../shared/interface/request.interface';
import { firstValueFrom } from "rxjs";

@ApiTags(API_TAGS.USER)
@Controller(CONTROLLERS.USER)
@ApiBearerAuth()
export class UserController {
    constructor(
        @Inject(SERVICES.USER) private userServiceClient: ClientProxy
    ) {}


    @Post(API_ENDPOINTS.USER.CREATE)
    @ApiOperation({ summary: 'Create a new user' })
    @ApiCreatedResponse({ type:  AddAdminUserResponseDto})
    public async createUser(
        @Body() body:CreateUserDto,
        @Req()  request: AppRequest
    ): Promise<AddAdminUserResponseDto> {
        const response = await firstValueFrom(
            this.userServiceClient.send(RMQ_MESSAGES.USER.CREATE, {
                ...body,
                createdBy: "test"
            })
        )
       return response;
    }


}