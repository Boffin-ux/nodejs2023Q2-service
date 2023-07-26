import {
  Inject,
  Injectable,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { IAlbum } from 'src/albums/interface/album.interface';
import { ArtistsService } from 'src/artists/artists.service';
import { IArtist } from 'src/artists/interface/artist.interface';
import { ResponseMessages } from 'src/common/enums/response-messages.enum';
import { ITrack } from 'src/tracks/interface/track.interface';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class FavoritesService {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];

  constructor(
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {
    this.albums = [];
    this.artists = [];
    this.tracks = [];
  }

  async getFavorites() {
    return {
      artists: this.artists,
      albums: this.albums,
      tracks: this.tracks,
    };
  }

  async addTrack(id: string) {
    const track = await this.tracksService.getTrackById(id);

    if (!track) {
      throw new UnprocessableEntityException(ResponseMessages.NOT_FOUND);
    }

    this.tracks = [...this.tracks, track];
    return track;
  }

  async getTrack(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  async deleteTrack(id: string) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      throw new UnprocessableEntityException(ResponseMessages.NOT_FOUND);
    }

    this.tracks.splice(trackIndex, 1);
  }

  async addArtist(id: string) {
    const artist = await this.artistsService.getArtistById(id);

    if (!artist) {
      throw new UnprocessableEntityException(ResponseMessages.NOT_FOUND);
    }

    this.artists = [...this.artists, artist];
    return artist;
  }

  async getArtist(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  async deleteArtist(id: string) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);

    if (artistIndex === -1) {
      throw new UnprocessableEntityException(ResponseMessages.NOT_FOUND);
    }

    this.artists.splice(artistIndex, 1);
  }

  async addAlbum(id: string) {
    const album = await this.albumsService.getAlbumById(id);

    if (!album) {
      throw new UnprocessableEntityException(ResponseMessages.NOT_FOUND);
    }

    this.albums = [...this.albums, album];
    return album;
  }

  async getAlbum(id: string) {
    return this.albums.find((album) => album.id === id);
  }

  async deleteAlbum(id: string) {
    const albumIndex = this.albums.findIndex((album) => album.id === id);

    if (albumIndex === -1) {
      throw new UnprocessableEntityException(ResponseMessages.NOT_FOUND);
    }

    this.albums.splice(albumIndex, 1);
  }
}
