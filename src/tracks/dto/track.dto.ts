import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class TrackDto {
  @ApiProperty()
  @IsString()
  @Length(2, 24, { message: 'Name length min 2, max 24' })
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly artistId: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly albumId: string | null;

  @ApiProperty()
  @IsNumber()
  readonly duration: number;
}
