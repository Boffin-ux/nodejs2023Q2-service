import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, Length } from 'class-validator';

export class ArtistDto {
  @ApiProperty()
  @IsString()
  @Length(2, 24, { message: 'Name length min 2, max 24' })
  readonly name: string;

  @ApiProperty()
  @IsBoolean()
  readonly grammy: boolean;
}
