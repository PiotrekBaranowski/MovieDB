export interface SearchedShows {
  searchText: string;
  searchedShowsList: TvShow[];
}

export interface TvShow {
  name: string;
  showId?: string;
  imageUrl?: string;
  rating?: number;
  summary?: string;
  platform?: string;
}

export interface Episode {
  name: string;
  number: number;
  season: number;
}

export type EpisodeList = Episode[];

export interface Season {
  number: number;
  imageUrl?: string;
  platform?: string;
  premiereDate?: string;
  summary?: string;
}

export type SeasonList = Season[];

export interface Cast {
  personName: string;
  characterName: string;
  imageUrl?: string;
}

export type CastList = Cast[];
