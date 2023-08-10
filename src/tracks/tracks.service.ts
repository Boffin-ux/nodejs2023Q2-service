import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackDto } from './dto/track.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';

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
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND);
    }

    return await this.prisma.track.update({
      where: { id },
      data: dto,
    });
  }

  async deleteTrack(id: string) {
    try {
      await this.prisma.track.delete({ where: { id } });
    } catch (err) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND);
    }
  }
}
