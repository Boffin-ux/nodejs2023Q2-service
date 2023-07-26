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
import { TrackDto } from './dto/track.dto';
import { TracksService } from './tracks.service';

@ApiTags('Tracks')
@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @ApiOperation({ summary: 'Get tracks list' })
  @ApiOkResponse({ description: 'Successful operation' })
  @Get('')
  async getAll() {
    return await this.tracksService.getAllTracks();
  }

  @ApiOperation({ summary: 'Add new track' })
  @ApiCreatedResponse({ description: 'New track is created' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @Post('')
  async create(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    trackDto: TrackDto,
  ) {
    return await this.tracksService.addTrack(trackDto);
  }

  @ApiOperation({ summary: 'Get single track by id' })
  @ApiOkResponse({ description: 'Found track' })
  @ApiNotFoundResponse({ description: `Track ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @UseInterceptors(new NotFoundInterceptor('Track'))
  @Get(':trackId')
  async getAlbum(@Param('trackId', ValidateId) id: string) {
    return await this.tracksService.getTrackById(id);
  }

  @ApiOperation({ summary: 'Update track information by ID' })
  @ApiOkResponse({ description: 'Track updated' })
  @ApiNotFoundResponse({ description: `Track ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @Put(':trackId')
  async update(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    trackDto: TrackDto,
    @Param('trackId', ValidateId) id: string,
  ) {
    return await this.tracksService.updateTrack(id, trackDto);
  }

  @ApiOperation({ summary: 'Delete Track by ID' })
  @ApiNoContentResponse({ description: 'Track deleted' })
  @ApiNotFoundResponse({ description: `Track ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':trackId')
  async remove(@Param('trackId', ValidateId) id: string) {
    return await this.tracksService.deleteTrack(id);
  }
}
