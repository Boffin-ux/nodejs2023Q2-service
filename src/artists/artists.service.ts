import { Injectable } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { Database } from 'src/db/database.provider';

@Injectable()
export class ArtistsService {
  constructor(private db: Database) {}

  async getAllArtists() {
    return await this.db.artists.getAllArtists();
  }

  async addArtist(dto: ArtistDto) {
    return await this.db.artists.addArtist(dto);
  }

  async getArtistById(id: string) {
    return this.db.artists.getArtistById(id);
  }

  async updateArtist(id: string, dto: ArtistDto) {
    return await this.db.artists.updateArtist(id, dto);
  }

  async deleteArtist(id: string) {
    await this.db.removeArtist(id);
  }
}
