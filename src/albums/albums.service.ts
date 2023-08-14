import { Injectable } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { PrismaService } from 'src/prisma.service';

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
    try {
      return await this.prisma.album.update({
        where: { id },
        data: dto,
      });
    } catch {
      return null;
    }
  }

  async deleteAlbum(id: string) {
    try {
      await this.prisma.album.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
