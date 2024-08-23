import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'johndoe@gmail.com' })
  email: string;
  @ApiProperty({ example: 'YourPassword' })
  password: string;
}
