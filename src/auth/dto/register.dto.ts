import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'John Doe' })
  name: string;
  @ApiProperty({ example: 'johndoe@gmail.com' })
  email: string;
  @ApiProperty({ example: 'your password' })
  password: string;
  @ApiProperty({ example: 1500 })
  balance: number;
}
