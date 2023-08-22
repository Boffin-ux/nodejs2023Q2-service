import { Injectable } from '@nestjs/common';
import { TrackDto } from './dto/track.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  async getAllTracks() {
    return await this.prisma.track.findMany();
  }

  async addTrack(dto: TrackDto) {
    return await this.prisma.track.create({ data: dto });
  }

  async getTrackById(id: string) {
    return this.prisma.track.findUnique({ where: { id } });
  }

  async updateTrack(id: string, dto: TrackDto) {
    try {
      return await this.prisma.track.update({
        where: { id },
        data: dto,
      });
    } catch {
      return null;
    }
  }

  async deleteTrack(id: string) {
    try {
      await this.prisma.track.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
