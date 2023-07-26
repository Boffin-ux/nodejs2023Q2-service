import {
  Body,
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

@ApiTags('Albums')
@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @ApiOperation({ summary: 'Get albums list' })
  @ApiOkResponse({ description: 'Successful operation' })
  @Get('')
  async getAll() {
    return await this.albumsService.getAllAlbums();
  }

  @ApiOperation({ summary: 'Add new album' })
  @ApiCreatedResponse({ description: 'New album is created' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @Post('')
  async create(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    albumDto: AlbumDto,
  ) {
    return await this.albumsService.addAlbum(albumDto);
  }

  @ApiOperation({ summary: 'Get single album by id' })
  @ApiOkResponse({ description: 'Found album' })
  @ApiNotFoundResponse({ description: `Album ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @UseInterceptors(new NotFoundInterceptor('Album'))
  @Get(':albumId')
  async getAlbum(@Param('albumId', ValidateId) id: string) {
    return await this.albumsService.getAlbumById(id);
  }

  @ApiOperation({ summary: 'Update Album by ID' })
  @ApiOkResponse({ description: 'Album updated' })
  @ApiNotFoundResponse({ description: `Album ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @Put(':albumId')
  async update(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    albumDto: AlbumDto,
    @Param('albumId', ValidateId) id: string,
  ) {
    return await this.albumsService.updateAlbum(id, albumDto);
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
