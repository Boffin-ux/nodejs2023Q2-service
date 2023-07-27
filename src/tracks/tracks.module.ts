import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [DatabaseModule],
})
export class TracksModule {}
