import { Injectable } from '@nestjs/common';
import { FavoritesDatabase } from './favorites.db';

type Entries<T> = {
  [K in keyof T]: [key: K, value: T[K]];
}[keyof T][];

@Injectable()
export class Database {
  favorites: FavoritesDatabase;

  constructor() {
    this.favorites = new FavoritesDatabase();
  }

  async removeArtist(id: string) {
    this.favorites.deleteArtist(id);
  }

  async removeTrack(id: string) {
    this.favorites.deleteTrack(id);
  }

  async removeAlbum(id: string) {
    this.favorites.deleteAlbum(id);
  }

  async getAllFavorites() {
    const getIdx = await this.favorites.getFavorites();
    const idx = Object.entries(getIdx) as Entries<typeof getIdx>;
    return idx;
  }
}
