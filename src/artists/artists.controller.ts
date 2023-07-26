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
  ApiForbiddenResponse,
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

@ApiTags('Artists')
@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @ApiOperation({ summary: 'Get all artists' })
  @ApiOkResponse({ description: 'Successful operation' })
  @Get('')
  async getAll() {
    return await this.artistsService.getAllArtists();
  }

  @ApiOperation({ summary: 'Add new artist' })
  @ApiCreatedResponse({ description: 'New artist is created' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @Post('')
  async create(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    artistDto: ArtistDto,
  ) {
    return await this.artistsService.addArtist(artistDto);
  }

  @ApiOperation({ summary: 'Get Artist By Id' })
  @ApiOkResponse({ description: 'Found artist' })
  @ApiNotFoundResponse({ description: `Artist ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @UseInterceptors(new NotFoundInterceptor('Artist'))
  @Get(':artistId')
  async getArtist(@Param('artistId', ValidateId) id: string) {
    return await this.artistsService.getArtistById(id);
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
    return await this.artistsService.updateArtist(id, artistDto);
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
