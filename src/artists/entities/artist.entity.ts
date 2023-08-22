import { Exclude } from 'class-transformer';

export class ArtistEntity {
  id: string;
  name: string;
  grammy: boolean;

  @Exclude()
  favoriteId: string;

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }
}
