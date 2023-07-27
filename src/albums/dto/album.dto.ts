import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class AlbumDto {
  @ApiProperty()
  @IsString()
  @Length(2, 24, { message: 'Name length min 2, max 24' })
  readonly name: string;

  @ApiProperty()
  @IsNumber()
  readonly year: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly artistId: string | null;
}
