import { Injectable } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { Database } from 'src/db/database.provider';

@Injectable()
export class AlbumsService {
  constructor(private db: Database) {}

  async getAllAlbums() {
    return await this.db.albums.getAllAlbums();
  }

  async addAlbum(dto: AlbumDto) {
    return await this.db.albums.addAlbum(dto);
  }

  async getAlbumById(id: string) {
    return this.db.albums.getAlbumById(id);
  }

  async updateAlbum(id: string, dto: AlbumDto) {
    return await this.db.albums.updateAlbum(id, dto);
  }

  async deleteAlbum(id: string) {
    await this.db.removeAlbum(id);
  }
}
