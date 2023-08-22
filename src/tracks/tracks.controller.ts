import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
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
import { TrackDto } from './dto/track.dto';
import { TracksService } from './tracks.service';
import { TrackEntity } from './entities/track.entity';
import { Auth } from '@src/common/decorators/auth.decorator';

@ApiTags('Tracks')
@Controller('track')
@UseInterceptors(ClassSerializerInterceptor)
@Auth()
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @ApiOperation({ summary: 'Get tracks list' })
  @ApiOkResponse({ description: 'Successful operation' })
  @Get('')
  async getAll() {
    const tracks = await this.tracksService.getAllTracks();
    return tracks.map((track) => new TrackEntity(track));
  }

  @ApiOperation({ summary: 'Add new track' })
  @ApiCreatedResponse({ description: 'New track is created' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseMessages.SERVER_ERROR,
  })
  @Post('')
  async create(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    trackDto: TrackDto,
  ) {
    const track = await this.tracksService.addTrack(trackDto);
    return new TrackEntity(track);
  }

  @ApiOperation({ summary: 'Get single track by id' })
  @ApiOkResponse({ description: 'Found track' })
  @ApiNotFoundResponse({ description: `Track ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @UseInterceptors(new NotFoundInterceptor('Track'))
  @Get(':trackId')
  async getAlbum(@Param('trackId', ValidateId) id: string) {
    const track = await this.tracksService.getTrackById(id);
    return new TrackEntity(track);
  }

  @ApiOperation({ summary: 'Update track information by ID' })
  @ApiOkResponse({ description: 'Track updated' })
  @ApiNotFoundResponse({ description: `Track ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseMessages.SERVER_ERROR,
  })
  @UseInterceptors(new NotFoundInterceptor('Track'))
  @Put(':trackId')
  async update(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    trackDto: TrackDto,
    @Param('trackId', ValidateId) id: string,
  ) {
    const track = await this.tracksService.updateTrack(id, trackDto);
    return new TrackEntity(track);
  }

  @ApiOperation({ summary: 'Delete Track by ID' })
  @ApiNoContentResponse({ description: 'Track deleted' })
  @ApiNotFoundResponse({ description: `Track ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':trackId')
  async remove(@Param('trackId', ValidateId) id: string) {
    const track = await this.tracksService.deleteTrack(id);
    if (!track) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND);
    }
    return track;
  }
}
