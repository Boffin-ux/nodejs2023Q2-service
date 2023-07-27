import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [DatabaseModule],
})
export class AlbumsModule {}
