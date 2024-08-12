import { CreateUserDto } from "@shared/dto";
import { ResponseMessage, successResponse } from "@shared/constants";
import { Injectable, HttpStatus } from '@nestjs/common';
import { UserRepository } from "@shared";

@Injectable()
export class UserService {

    constructor(
        private userRepository: UserRepository,
    ) {}

    async create(payload: CreateUserDto) {
        const response = await this.userRepository.create(payload);
        return successResponse(
            HttpStatus.OK,
            ResponseMessage.SUCCESS,
            response

        );

    }




}