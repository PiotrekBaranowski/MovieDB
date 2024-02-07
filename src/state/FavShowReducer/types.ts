import { TvShow } from 'src/state/SearchedShowsReducer/types';

export interface FavShowState {
  favShowList: FavShow[];
}

export interface FavShow extends TvShow {
  userId: string;
  id: string;
}
