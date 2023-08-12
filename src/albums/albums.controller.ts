import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import {
  Delete,
  Param,
  Put,
  Post,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common/decorators';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger/dist';
import { ValidateId } from 'src/common/validations/validate-id.pipe';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { NotFoundInterceptor } from 'src/common/interceptors/notFound.interceptor';
import { AlbumsService } from './albums.service';
import { AlbumDto } from './dto/album.dto';
import { AlbumEntity } from './entities/album.entity';

@ApiTags('Albums')
@Controller('album')
@UseInterceptors(ClassSerializerInterceptor)
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @ApiOperation({ summary: 'Get albums list' })
  @ApiOkResponse({ description: 'Successful operation' })
  @Get('')
  async getAll() {
    const albums = await this.albumsService.getAllAlbums();
    return albums.map((album) => new AlbumEntity(album));
  }

  @ApiOperation({ summary: 'Add new album' })
  @ApiCreatedResponse({ description: 'New album is created' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseMessages.SERVER_ERROR,
  })
  @Post('')
  async create(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    albumDto: AlbumDto,
  ) {
    const album = await this.albumsService.addAlbum(albumDto);
    return new AlbumEntity(album);
  }

  @ApiOperation({ summary: 'Get single album by id' })
  @ApiOkResponse({ description: 'Found album' })
  @ApiNotFoundResponse({ description: `Album ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @UseInterceptors(new NotFoundInterceptor('Album'))
  @Get(':albumId')
  async getAlbum(@Param('albumId', ValidateId) id: string) {
    const album = await this.albumsService.getAlbumById(id);
    return new AlbumEntity(album);
  }

  @ApiOperation({ summary: 'Update Album by ID' })
  @ApiOkResponse({ description: 'Album updated' })
  @ApiNotFoundResponse({ description: `Album ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseMessages.SERVER_ERROR,
  })
  @Put(':albumId')
  async update(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    albumDto: AlbumDto,
    @Param('albumId', ValidateId) id: string,
  ) {
    const album = await this.albumsService.updateAlbum(id, albumDto);
    return new AlbumEntity(album);
  }

  @ApiOperation({ summary: 'Delete Album by ID' })
  @ApiNoContentResponse({ description: 'Album deleted' })
  @ApiNotFoundResponse({ description: `Album ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':albumId')
  async remove(@Param('albumId', ValidateId) id: string) {
    return await this.albumsService.deleteAlbum(id);
  }
}
