import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(4, 12, { message: 'Login length min 4, max 12' })
  readonly login: string;

  @IsString()
  @Length(4, 16, { message: 'Password length min 4, max 16' })
  readonly password: string;
}
