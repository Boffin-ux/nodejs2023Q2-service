import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { v4 as uuidv4 } from 'uuid';
import { IAlbum } from './interface/album.interface';
import { AlbumDto } from './dto/album.dto';

@Injectable()
export class AlbumsService {
  private albums: IAlbum[];

  constructor() {
    this.albums = [];
  }

  async getAllAlbums() {
    return this.albums;
  }

  async addAlbum(dto: AlbumDto) {
    const album = {
      id: uuidv4(),
      ...dto,
    };
    this.albums = [...this.albums, album];

    return album;
  }

  async getAlbumById(id: string) {
    return this.albums.find((album) => album.id === id);
  }

  async updateAlbum(id: string, dto: AlbumDto) {
    let album = this.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND);
    }

    album = { ...album, ...dto };

    return album;
  }

  async deleteAlbum(id: string) {
    const artistIndex = this.albums.findIndex((album) => album.id === id);

    if (artistIndex === -1) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND);
    }

    this.albums.splice(artistIndex, 1);
  }

  async setNullArtistId(id: string) {
    this.albums = this.albums.map((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
      return album;
    });
  }
}
