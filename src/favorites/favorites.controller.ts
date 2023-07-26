import { Controller, Get, HttpStatus } from '@nestjs/common';
import { Delete, Param, Post, HttpCode } from '@nestjs/common/decorators';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger/dist';
import { FavoritesService } from './favorites.service';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { ValidateId } from 'src/common/validations/validate-id.pipe';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @ApiOperation({ summary: 'Get all favorites' })
  @ApiOkResponse({ description: 'Successful operation' })
  @Get('')
  async getAll() {
    return await this.favoritesService.getFavorites();
  }

  @ApiOperation({ summary: 'Add track to the favorites' })
  @ApiCreatedResponse({ description: 'Added successfully' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiUnprocessableEntityResponse({ description: ResponseMessages.NOT_FOUND })
  @Post('track/:trackId')
  async addTrack(@Param('trackId', ValidateId) id: string) {
    return await this.favoritesService.addTrack(id);
  }

  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiCreatedResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiUnprocessableEntityResponse({ description: ResponseMessages.NOT_FOUND })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:trackId')
  async removeTrack(@Param('trackId', ValidateId) id: string) {
    return await this.favoritesService.deleteTrack(id);
  }

  @ApiOperation({ summary: 'Add artist to the favorites' })
  @ApiCreatedResponse({ description: 'Added successfully' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiUnprocessableEntityResponse({ description: ResponseMessages.NOT_FOUND })
  @Post('artist/:artistId')
  async addArtist(@Param('artistId', ValidateId) id: string) {
    return await this.favoritesService.addArtist(id);
  }

  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiCreatedResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiUnprocessableEntityResponse({ description: ResponseMessages.NOT_FOUND })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:artistId')
  async removeArtist(@Param('artistId', ValidateId) id: string) {
    return await this.favoritesService.deleteArtist(id);
  }

  @ApiOperation({ summary: 'Add album to the favorites' })
  @ApiCreatedResponse({ description: 'Added successfully' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiUnprocessableEntityResponse({ description: ResponseMessages.NOT_FOUND })
  @Post('album/:albumId')
  async addAlbum(@Param('albumId', ValidateId) id: string) {
    return await this.favoritesService.addAlbum(id);
  }

  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiCreatedResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiUnprocessableEntityResponse({ description: ResponseMessages.NOT_FOUND })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:albumId')
  async removeAlbum(@Param('albumId', ValidateId) id: string) {
    return await this.favoritesService.deleteAlbum(id);
  }
}
