import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
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
      await this.prisma.track.update({
        where: { id },
        data: {
          favoriteId: (await this.prisma.favorites.create({ data: {} })).id,
        },
      });
    } catch (err) {
      throw new UnprocessableEntityException(ResponseMessages.NOT_FOUND);
    }
  }

  async deleteTrack(id: string) {
    try {
      await this.prisma.track.update({
        where: { id },
        data: { favoriteId: null },
      });
    } catch (err) {
      throw new UnprocessableEntityException(ResponseMessages.NOT_FOUND);
    }
  }

  async addArtist(id: string) {
    try {
      await this.prisma.artist.update({
        where: { id },
        data: {
          favoriteId: (await this.prisma.favorites.create({ data: {} })).id,
        },
      });
    } catch (err) {
      throw new UnprocessableEntityException(ResponseMessages.NOT_FOUND);
    }
  }

  async deleteArtist(id: string) {
    try {
      await this.prisma.artist.update({
        where: { id },
        data: { favoriteId: null },
      });
    } catch (err) {
      throw new UnprocessableEntityException(ResponseMessages.NOT_FOUND);
    }
  }

  async addAlbum(id: string) {
    try {
      await this.prisma.album.update({
        where: { id },
        data: {
          favoriteId: (await this.prisma.favorites.create({ data: {} })).id,
        },
      });
    } catch (err) {
      throw new UnprocessableEntityException(ResponseMessages.NOT_FOUND);
    }
  }

  async deleteAlbum(id: string) {
    try {
      await this.prisma.album.update({
        where: { id },
        data: { favoriteId: null },
      });
    } catch (err) {
      throw new UnprocessableEntityException(ResponseMessages.NOT_FOUND);
    }
  }
}
