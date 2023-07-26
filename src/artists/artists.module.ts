import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { AlbumsModule } from 'src/albums/albums.module';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [AlbumsModule, TracksModule],
})
export class ArtistsModule {}
