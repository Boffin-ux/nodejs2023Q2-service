import { Exclude } from 'class-transformer';

export class TrackEntity {
  id: string;
  name: string;
  artistId: string;
  albumId: string;
  duration: number;

  @Exclude()
  favoriteId: string;

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
