import { Injectable } from '@nestjs/common';
import { ArtistsDatabase } from './artists.db';
import { TracksDatabase } from './tracks.db';
import { AlbumsDatabase } from './albums.db';
import { FavoritesDatabase } from './favorites.db';
import { FavData, IFavoritesData } from './interface/favorite.interface';

type Entries<T> = {
  [K in keyof T]: [key: K, value: T[K]];
}[keyof T][];

@Injectable()
export class Database {
  artists: ArtistsDatabase;
  tracks: TracksDatabase;
  albums: AlbumsDatabase;
  favorites: FavoritesDatabase;

  constructor() {
    this.artists = new ArtistsDatabase();
    this.tracks = new TracksDatabase();
    this.albums = new AlbumsDatabase();
    this.favorites = new FavoritesDatabase();
  }

  async removeArtist(id: string) {
    await this.artists.deleteArtist(id);
    await this.tracks.setNullArtistId(id);
    await this.albums.setNullArtistId(id);
    this.favorites.deleteArtist(id);
  }

  async removeTrack(id: string) {
    await this.tracks.deleteTrack(id);
    this.favorites.deleteTrack(id);
  }

  async removeAlbum(id: string) {
    await this.albums.deleteAlbum(id);
    await this.tracks.setNullAlbumId(id);
    this.favorites.deleteAlbum(id);
  }

  async getAllFavorites() {
    const getIdx = await this.favorites.getFavorites();
    const idx = Object.entries(getIdx) as Entries<typeof getIdx>;

    const favoritesData = idx.reduce((acc, [value, arr]) => {
      if (value === FavData.ARTISTS) {
        acc[value] = arr.map((id) => this.artists.getArtistById(id));
      }
      if (value === FavData.ALBUMS) {
        acc[value] = arr.map((id) => this.albums.getAlbumById(id));
      }
      if (value === FavData.TRACKS) {
        acc[value] = arr.map((id) => this.tracks.getTrackById(id));
      }

      return acc;
    }, {} as IFavoritesData);

    return favoritesData;
  }
}
