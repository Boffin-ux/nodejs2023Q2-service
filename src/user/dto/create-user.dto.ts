import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @Length(2, 24, { message: 'Login length min 2, max 24' })
  readonly login: string;

  @ApiProperty()
  @IsString()
  @Length(4, 16, { message: 'Password length min 4, max 16' })
  readonly password: string;
}
