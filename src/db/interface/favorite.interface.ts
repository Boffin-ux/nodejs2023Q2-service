import { IAlbum } from './album.interface';
import { IArtist } from './artist.interface';
import { ITrack } from './track.interface';

interface IFavorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

interface IFavoritesData {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}

enum FavData {
  ARTISTS = 'artists',
  ALBUMS = 'albums',
  TRACKS = 'tracks',
}

export { IFavorites, IFavoritesData, FavData };
