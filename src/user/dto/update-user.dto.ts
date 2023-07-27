import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty()
  @IsString()
  readonly oldPassword: string;

  @ApiProperty()
  @IsString()
  @Length(4, 16, { message: 'newPassword length min 4, max 16' })
  readonly newPassword: string;
}
