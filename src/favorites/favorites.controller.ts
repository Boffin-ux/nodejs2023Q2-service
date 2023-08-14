import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import {
  Delete,
  Param,
  Post,
  HttpCode,
  UseInterceptors,
} from '@nestjs/common/decorators';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger/dist';
import { FavoritesService } from './favorites.service';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { ValidateId } from 'src/common/validations/validate-id.pipe';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { UnEntityInterceptor } from './interceptors/unEntity.interceptor';

@ApiTags('Favorites')
@Controller('favs')
@UseInterceptors(ClassSerializerInterceptor)
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @ApiOperation({ summary: 'Get all favorites' })
  @ApiOkResponse({ description: 'Successful operation' })
  @Get('')
  async getAll() {
    const { artists, albums, tracks } =
      await this.favoritesService.getAllFavorites();
    return {
      artists: artists.map((artist) => new ArtistEntity(artist)),
      albums: albums.map((album) => new AlbumEntity(album)),
      tracks: tracks.map((track) => new TrackEntity(track)),
    };
  }

  @ApiOperation({ summary: 'Add track to the favorites' })
  @ApiCreatedResponse({ description: 'Added successfully' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiUnprocessableEntityResponse({ description: ResponseMessages.NOT_FOUND })
  @UseInterceptors(new UnEntityInterceptor('Track'))
  @Post('track/:trackId')
  async addTrack(@Param('trackId', ValidateId) id: string) {
    return await this.favoritesService.addTrack(id);
  }

  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiUnprocessableEntityResponse({ description: ResponseMessages.NOT_FOUND })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:trackId')
  async removeTrack(@Param('trackId', ValidateId) id: string) {
    const track = await this.favoritesService.deleteTrack(id);

    if (!track) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND);
    }

    return track;
  }

  @ApiOperation({ summary: 'Add artist to the favorites' })
  @ApiCreatedResponse({ description: 'Added successfully' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiUnprocessableEntityResponse({ description: ResponseMessages.NOT_FOUND })
  @UseInterceptors(new UnEntityInterceptor('Artist'))
  @Post('artist/:artistId')
  async addArtist(@Param('artistId', ValidateId) id: string) {
    return await this.favoritesService.addArtist(id);
  }

  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiUnprocessableEntityResponse({ description: ResponseMessages.NOT_FOUND })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:artistId')
  async removeArtist(@Param('artistId', ValidateId) id: string) {
    const artist = await this.favoritesService.deleteArtist(id);

    if (!artist) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND);
    }

    return artist;
  }

  @ApiOperation({ summary: 'Add album to the favorites' })
  @ApiCreatedResponse({ description: 'Added successfully' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiUnprocessableEntityResponse({ description: ResponseMessages.NOT_FOUND })
  @UseInterceptors(new UnEntityInterceptor('Album'))
  @Post('album/:albumId')
  async addAlbum(@Param('albumId', ValidateId) id: string) {
    return await this.favoritesService.addAlbum(id);
  }

  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiUnprocessableEntityResponse({ description: ResponseMessages.NOT_FOUND })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:albumId')
  async removeAlbum(@Param('albumId', ValidateId) id: string) {
    const album = await this.favoritesService.deleteAlbum(id);

    if (!album) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND);
    }

    return album;
  }
}
