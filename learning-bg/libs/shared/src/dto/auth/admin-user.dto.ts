import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { UserRole } from "../../constants";

export class CreateUserDto {
    @ApiProperty({type: String, example: 'John Doe'})
    @IsNotEmpty()
    name: string;

    @ApiProperty({type: String, example: 'example@g.com'})
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: UserRole.SUPER_ADMIN,
        enum: UserRole,
      })
    @IsNotEmpty()
    role: string;
    
    
}