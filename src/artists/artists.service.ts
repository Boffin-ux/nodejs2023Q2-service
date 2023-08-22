import { Injectable } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  async getAllArtists() {
    return await this.prisma.artist.findMany();
  }

  async addArtist(dto: ArtistDto) {
    return await this.prisma.artist.create({ data: dto });
  }

  async getArtistById(id: string) {
    return this.prisma.artist.findUnique({ where: { id } });
  }

  async updateArtist(id: string, dto: ArtistDto) {
    try {
      return await this.prisma.artist.update({
        where: { id },
        data: dto,
      });
    } catch {
      return null;
    }
  }

  async deleteArtist(id: string) {
    try {
      await this.prisma.artist.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
