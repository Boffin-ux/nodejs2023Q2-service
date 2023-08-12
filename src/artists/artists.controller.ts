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
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger/dist';
import { ValidateId } from 'src/common/validations/validate-id.pipe';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { NotFoundInterceptor } from 'src/common/interceptors/notFound.interceptor';
import { ArtistsService } from './artists.service';
import { ArtistDto } from './dto/artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@ApiTags('Artists')
@Controller('artist')
@UseInterceptors(ClassSerializerInterceptor)
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @ApiOperation({ summary: 'Get all artists' })
  @ApiOkResponse({ description: 'Successful operation' })
  @Get('')
  async getAll() {
    const artists = await this.artistsService.getAllArtists();
    return artists.map((artist) => new ArtistEntity(artist));
  }

  @ApiOperation({ summary: 'Add new artist' })
  @ApiCreatedResponse({ description: 'New artist is created' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @Post('')
  async create(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    artistDto: ArtistDto,
  ) {
    const artist = await this.artistsService.addArtist(artistDto);
    return new ArtistEntity(artist);
  }

  @ApiOperation({ summary: 'Get Artist By Id' })
  @ApiOkResponse({ description: 'Found artist' })
  @ApiNotFoundResponse({ description: `Artist ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @UseInterceptors(new NotFoundInterceptor('Artist'))
  @Get(':artistId')
  async getArtist(@Param('artistId', ValidateId) id: string) {
    const artist = await this.artistsService.getArtistById(id);
    return new ArtistEntity(artist);
  }

  @ApiOperation({ summary: 'Update Artist by ID' })
  @ApiOkResponse({ description: 'Artist updated' })
  @ApiNotFoundResponse({ description: `Artist ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @Put(':artistId')
  async update(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    artistDto: ArtistDto,
    @Param('artistId', ValidateId) id: string,
  ) {
    const artist = await this.artistsService.updateArtist(id, artistDto);
    return new ArtistEntity(artist);
  }

  @ApiOperation({ summary: 'Delete Artist by ID' })
  @ApiNoContentResponse({ description: 'Artist deleted' })
  @ApiNotFoundResponse({ description: `Artist ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':artistId')
  async remove(@Param('artistId', ValidateId) id: string) {
    return await this.artistsService.deleteArtist(id);
  }
}
