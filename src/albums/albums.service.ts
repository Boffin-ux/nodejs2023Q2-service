import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { PrismaService } from 'src/prisma.service';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  async getAllAlbums() {
    return await this.prisma.album.findMany();
  }

  async addAlbum(dto: AlbumDto) {
    return await this.prisma.album.create({ data: dto });
  }

  async getAlbumById(id: string) {
    return await this.prisma.album.findUnique({ where: { id } });
  }

  async updateAlbum(id: string, dto: AlbumDto) {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND);
    }

    return await this.prisma.album.update({
      where: { id },
      data: dto,
    });
  }

  async deleteAlbum(id: string) {
    try {
      await this.prisma.album.delete({ where: { id } });
    } catch (err) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND);
    }
  }
}
