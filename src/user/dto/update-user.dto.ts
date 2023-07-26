import { IsString, Length } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  readonly oldPassword: string;

  @IsString()
  @Length(4, 16, { message: 'newPassword length min 4, max 16' })
  readonly newPassword: string;
}
