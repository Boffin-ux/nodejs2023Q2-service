import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';

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
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND);
    }

    return await this.prisma.artist.update({
      where: { id },
      data: dto,
    });
  }

  async deleteArtist(id: string) {
    try {
      await this.prisma.artist.delete({ where: { id } });
    } catch (err) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND);
    }
  }
}
