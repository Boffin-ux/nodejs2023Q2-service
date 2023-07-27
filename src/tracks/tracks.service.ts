import { Injectable } from '@nestjs/common';
import { TrackDto } from './dto/track.dto';
import { Database } from 'src/db/database.provider';

@Injectable()
export class TracksService {
  constructor(private db: Database) {}

  async getAllTracks() {
    return await this.db.tracks.getAllTracks();
  }

  async addTrack(dto: TrackDto) {
    return await this.db.tracks.addTrack(dto);
  }

  async getTrackById(id: string) {
    return this.db.tracks.getTrackById(id);
  }

  async updateTrack(id: string, dto: TrackDto) {
    return await this.db.tracks.updateTrack(id, dto);
  }

  async deleteTrack(id: string) {
    await this.db.removeTrack(id);
  }
}
