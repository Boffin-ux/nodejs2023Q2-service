import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getAllFavorites() {
    const [artists, albums, tracks] = await Promise.all([
      this.prisma.artist.findMany({ where: { NOT: [{ favoriteId: null }] } }),
      this.prisma.album.findMany({ where: { NOT: [{ favoriteId: null }] } }),
      this.prisma.track.findMany({ where: { NOT: [{ favoriteId: null }] } }),
    ]);

    return { artists, albums, tracks };
  }

  async addTrack(id: string) {
    try {
      return await this.prisma.track.update({
        where: { id },
        data: {
          favoriteId: (await this.prisma.favorites.create({ data: {} })).id,
        },
      });
    } catch {
      return null;
    }
  }

  async deleteTrack(id: string) {
    try {
      return await this.prisma.track.update({
        where: { id },
        data: { favoriteId: null },
      });
    } catch {
      return false;
    }
  }

  async addArtist(id: string) {
    try {
      return await this.prisma.artist.update({
        where: { id },
        data: {
          favoriteId: (await this.prisma.favorites.create({ data: {} })).id,
        },
      });
    } catch {
      return null;
    }
  }

  async deleteArtist(id: string) {
    try {
      return await this.prisma.artist.update({
        where: { id },
        data: { favoriteId: null },
      });
    } catch {
      return false;
    }
  }

  async addAlbum(id: string) {
    try {
      return await this.prisma.album.update({
        where: { id },
        data: {
          favoriteId: (await this.prisma.favorites.create({ data: {} })).id,
        },
      });
    } catch {
      return null;
    }
  }

  async deleteAlbum(id: string) {
    try {
      return await this.prisma.album.update({
        where: { id },
        data: { favoriteId: null },
      });
    } catch {
      return false;
    }
  }
}
