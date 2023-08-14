import { Exclude } from 'class-transformer';

export class AlbumEntity {
  id: string;
  name: string;
  year: number;
  artistId: string;

  @Exclude()
  favoriteId: string;

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
  }
}
