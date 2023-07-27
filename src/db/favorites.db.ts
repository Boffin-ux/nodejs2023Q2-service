import { Injectable } from '@nestjs/common';
import { IFavorites } from './interface/favorite.interface';

@Injectable()
export class FavoritesDatabase {
  data: IFavorites;

  constructor() {
    this.data = {
      artists: [],
      albums: [],
      tracks: [],
    };
  }

  async getFavorites() {
    return this.data;
  }

  addTrack(id: string) {
    this.data.tracks = [...this.data.tracks, id];
  }

  getTrack(id: string) {
    return this.data.tracks.find((trackId) => trackId === id);
  }

  deleteTrack(id: string) {
    this.data.tracks = this.data.tracks.filter((trackId) => trackId !== id);
  }

  addArtist(id: string) {
    this.data.artists = [...this.data.artists, id];
  }

  getArtist(id: string) {
    return this.data.artists.find((artistId) => artistId === id);
  }

  deleteArtist(id: string) {
    this.data.artists = this.data.artists.filter((artistId) => artistId !== id);
  }

  addAlbum(id: string) {
    this.data.albums = [...this.data.albums, id];
  }

  getAlbum(id: string) {
    return this.data.albums.find((albumId) => albumId === id);
  }

  deleteAlbum(id: string) {
    this.data.albums = this.data.albums.filter((albumId) => albumId !== id);
  }
}
