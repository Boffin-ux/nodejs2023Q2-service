import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [DatabaseModule],
})
export class ArtistsModule {}
