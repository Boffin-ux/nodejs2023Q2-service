import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { v4 as uuidv4 } from 'uuid';
import { IArtist } from './interface/artist.interface';
import { ArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistsService {
  private artists: IArtist[];

  constructor() {
    this.artists = [];
  }

  async getAllArtists() {
    return this.artists;
  }

  async addArtist(dto: ArtistDto) {
    const artist = {
      ...dto,
      id: uuidv4(),
    };
    this.artists = [...this.artists, artist];

    return artist;
  }

  async getArtistById(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  async updateArtist(id: string, dto: ArtistDto) {
    let artist = this.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND);
    }

    artist = { ...artist, ...dto };

    return artist;
  }

  async deleteArtist(id: string) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);

    if (artistIndex === -1) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND);
    }

    this.artists.splice(artistIndex, 1);
  }
}
