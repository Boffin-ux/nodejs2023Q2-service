import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { Database } from 'src/db/database.provider';

@Injectable()
export class FavoritesService {
  constructor(private db: Database) {}

  async getAllFavorites() {
    return await this.db.getAllFavorites();
  }

  async addTrack(id: string) {
    const track = this.db.tracks.getTrackById(id);

    if (!track) {
      throw new UnprocessableEntityException(ResponseMessages.NOT_FOUND);
    }

    this.db.favorites.addTrack(id);
  }

  async deleteTrack(id: string) {
    const track = this.db.favorites.getTrack(id);

    if (!track) {
      throw new UnprocessableEntityException(ResponseMessages.NOT_FOUND);
    }

    this.db.favorites.deleteTrack(id);
  }

  async addArtist(id: string) {
    const artist = this.db.artists.getArtistById(id);

    if (!artist) {
      throw new UnprocessableEntityException(ResponseMessages.NOT_FOUND);
    }

    this.db.favorites.addArtist(id);
  }

  async deleteArtist(id: string) {
    const artist = this.db.favorites.getArtist(id);

    if (!artist) {
      throw new UnprocessableEntityException(ResponseMessages.NOT_FOUND);
    }

    this.db.favorites.deleteArtist(id);
  }

  async addAlbum(id: string) {
    const album = this.db.albums.getAlbumById(id);

    if (!album) {
      throw new UnprocessableEntityException(ResponseMessages.NOT_FOUND);
    }

    this.db.favorites.addAlbum(id);
  }

  async deleteAlbum(id: string) {
    const album = this.db.favorites.getAlbum(id);

    if (!album) {
      throw new UnprocessableEntityException(ResponseMessages.NOT_FOUND);
    }

    this.db.favorites.deleteAlbum(id);
  }
}
