import { CastList, EpisodeList, SeasonList, TvShow } from 'src/state/SearchedShowsReducer/types';

export interface ShowInfoState {
  cast?: CastList;
  season?: SeasonList;
  episode?: EpisodeList;
  show?: TvShow;
}
