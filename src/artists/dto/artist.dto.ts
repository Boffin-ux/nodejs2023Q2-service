import { IsBoolean, IsString, Length } from 'class-validator';

export class ArtistDto {
  @IsString()
  @Length(2, 24, { message: 'Name length min 2, max 24' })
  readonly name: string;

  @IsBoolean()
  readonly grammy: boolean;
}
