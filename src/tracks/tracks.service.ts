import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { v4 as uuidv4 } from 'uuid';
import { ITrack } from './interface/track.interface';
import { TrackDto } from './dto/track.dto';

@Injectable()
export class TracksService {
  private tracks: ITrack[];

  constructor() {
    this.tracks = [];
  }

  async getAllTracks() {
    return this.tracks;
  }

  async addTrack(dto: TrackDto) {
    const track = {
      id: uuidv4(),
      ...dto,
    };
    this.tracks = [...this.tracks, track];

    return track;
  }

  async getTrackById(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  async updateTrack(id: string, dto: TrackDto) {
    let track = this.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND);
    }

    track = { ...track, ...dto };

    return track;
  }

  async deleteTrack(id: string) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND);
    }

    this.tracks.splice(trackIndex, 1);
  }

  async setNullArtistId(id: string) {
    this.tracks = this.tracks.map((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
      return track;
    });
  }

  async setNullAlbumId(id: string) {
    this.tracks = this.tracks.map((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
      return track;
    });
  }
}
