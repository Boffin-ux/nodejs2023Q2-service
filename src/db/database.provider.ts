import { Injectable } from '@nestjs/common';
import { TracksDatabase } from './tracks.db';
import { FavoritesDatabase } from './favorites.db';
import { FavData, IFavoritesData } from './interface/favorite.interface';

type Entries<T> = {
  [K in keyof T]: [key: K, value: T[K]];
}[keyof T][];

@Injectable()
export class Database {
  tracks: TracksDatabase;
  favorites: FavoritesDatabase;

  constructor() {
    this.tracks = new TracksDatabase();
    this.favorites = new FavoritesDatabase();
  }

  async removeArtist(id: string) {
    await this.tracks.setNullArtistId(id);
    this.favorites.deleteArtist(id);
  }

  async removeTrack(id: string) {
    await this.tracks.deleteTrack(id);
    this.favorites.deleteTrack(id);
  }

  async removeAlbum(id: string) {
    await this.tracks.setNullAlbumId(id);
    this.favorites.deleteAlbum(id);
  }

  async getAllFavorites() {
    const getIdx = await this.favorites.getFavorites();
    const idx = Object.entries(getIdx) as Entries<typeof getIdx>;

    const favoritesData = idx.reduce((acc, [value, arr]) => {
      if (value === FavData.TRACKS) {
        acc[value] = arr.map((id) => this.tracks.getTrackById(id));
      }

      return acc;
    }, {} as IFavoritesData);

    return favoritesData;
  }
}
