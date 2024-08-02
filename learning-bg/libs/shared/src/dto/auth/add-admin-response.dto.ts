import { ApiProperty } from '@nestjs/swagger';

export class AddAdminUserResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({
    example: {
      _id: '6544d211c7d6a2a220c91cf3',
      name: 'alo ',
      email: 'aliqaqor@yopmail.com',
      role: 'super-admin',
    }})
  data: {};

  @ApiProperty({ example: null })
  errors: [];
}
