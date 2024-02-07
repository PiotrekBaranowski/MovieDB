// EXAMPLE
// https://api.tvmaze.com/search/shows?q=house%20of%20cards
// get details of the show ID - episodes https://api.tvmaze.com/shows/175/episodes
// get details of the show ID - seasons https://api.tvmaze.com/shows/175/seasons
// get details of the show ID - cast https://api.tvmaze.com/shows/175/cast
// detailed informations - https://api.tvmaze.com/shows/175

import axios from 'axios';
import { redirect } from 'react-router';

import { store } from 'src/config/redux/config';
import { updateSearchedShowList } from 'src/state/SearchedShowsReducer/SearchedShowsReducer';
import { setShowInfo } from 'src/state/ShowInfoReducer/ShowInfoReducer';
import { CastList, EpisodeList, SeasonList, TvShow } from 'src/state/SearchedShowsReducer/types';
import { AppRoutes } from 'src/types/routes';
import {
  searchedShowsDoneLoading,
  searchedShowsisLoading,
  showInfoDoneLoading,
  showInfoIsLoading,
} from 'src/state/AppLoadingReducer/AppLoadingReducer';

const MAZE_API_CORE = 'https://api.tvmaze.com';

const MAZE_API_KEY_LIST_OF_SHOWS = (searchText: string) => {
  return `${MAZE_API_CORE}/search/shows?q=${encodeURIComponent(searchText)}`; // get call from Axios directly by text
};
const MAZE_API_KEY_DETAILED_INFO = (showId: string) => {
  return `${MAZE_API_CORE}/shows/${showId}`;
};
const MAZE_API_KEY_LIST_OF_EPISODES = (showId: string) => {
  return `${MAZE_API_CORE}/shows/${showId}/episodes`;
};

const MAZE_API_KEY_LIST_OF_SEASONS = (showId: string) => {
  return `${MAZE_API_CORE}/shows/${showId}/seasons`;
};

const MAZE_API_KEY_LIST_OF_CAST = (showId: string) => {
  return `${MAZE_API_CORE}/shows/${showId}/cast`;
};

export const getListOfTvShowsFromApi = async (searchText: string): Promise<void> => {
  try {
    store.dispatch(searchedShowsisLoading());
    const response = await axios.get(MAZE_API_KEY_LIST_OF_SHOWS(searchText));
    const listOfTvShowsFromApi: TvShow[] = [];
    if (response.data.length !== 0) {
      response.data.forEach((show) => {
        listOfTvShowsFromApi.push({
          name: show.show?.name,
          showId: show.show?.id,
          imageUrl: show.show.image?.medium,
          rating: show.show.rating?.average,
          platform: show.show.webChannel?.name ?? undefined,
        });
      });
      store.dispatch(updateSearchedShowList({ searchText: searchText, searchedShowsList: listOfTvShowsFromApi }));
    } else {
      const noShowFound: TvShow = {
        name: 'no_show_found',
      };
      store.dispatch(updateSearchedShowList({ searchText: searchText, searchedShowsList: [noShowFound] }));
    }
    store.dispatch(searchedShowsDoneLoading());
  } catch (error: any) {
    alert(error.message);
    store.dispatch(searchedShowsDoneLoading());
    redirect(AppRoutes.HOME);
  }
};

const getDetailedInfoOfShow = async (showId: string): Promise<TvShow | undefined> => {
  try {
    const response = await axios.get(MAZE_API_KEY_DETAILED_INFO(showId));
    if (response.data) {
      return {
        name: response.data?.name,
        showId: `${response.data?.id}`,
        imageUrl: response.data?.image?.medium,
        rating: response.data?.rating.average,
        platform: response.data?.webChannel?.name ?? undefined,
        summary: response.data?.summary,
      };
    }
  } catch (error: any) {
    alert(error.message);
    return undefined;
  }
  return undefined;
};

const getEpisodesOfShow = async (showId: string): Promise<EpisodeList | undefined> => {
  try {
    const episodeList: EpisodeList = [];
    const response = await axios.get(MAZE_API_KEY_LIST_OF_EPISODES(showId));
    if (response.data) {
      response.data.forEach((episode) =>
        episodeList.push({
          name: episode.name,
          number: episode.number,
          season: episode.season,
        })
      );
      return episodeList;
    }
  } catch (error: any) {
    alert(error.message);
    return undefined;
  }
  return undefined;
};

const getSeasonsOfShow = async (showId: string): Promise<SeasonList | undefined> => {
  try {
    const seasonList: SeasonList = [];
    const response = await axios.get(MAZE_API_KEY_LIST_OF_SEASONS(showId));
    if (response.data) {
      response.data.forEach((season) =>
        seasonList.push({
          number: season.number,
          imageUrl: season.image?.medium ?? undefined,
          platform: season.webChannel?.name ?? undefined,
          premiereDate: season.premiereDate ?? undefined,
          summary: season.summary ?? undefined,
        })
      );
      return seasonList;
    }
  } catch (error: any) {
    alert(error.message);
    return undefined;
  }
  return undefined;
};

const getCastOfShow = async (showId: string): Promise<CastList | undefined> => {
  try {
    const castList: CastList = [];
    const response = await axios.get(MAZE_API_KEY_LIST_OF_CAST(showId));
    if (response.data) {
      response.data.forEach((cast) =>
        castList.push({
          personName: cast.person.name,
          characterName: cast.character.name,
          imageUrl: cast.character?.image?.medium ?? undefined,
        })
      );
      return castList;
    }
  } catch (error: any) {
    alert(error.message);
    return undefined;
  }
  return undefined;
};
export const getAllInfoOfShow = async (showId: string): Promise<void> => {
  try {
    store.dispatch(showInfoIsLoading());
    const castList = await getCastOfShow(showId);
    const seasonList = await getSeasonsOfShow(showId);
    const episodeList = await getEpisodesOfShow(showId);
    const showInfo = await getDetailedInfoOfShow(showId);
    store.dispatch(setShowInfo({ cast: castList, episode: episodeList, season: seasonList, show: showInfo }));
    store.dispatch(showInfoDoneLoading());
  } catch (error: any) {
    store.dispatch(showInfoDoneLoading());
  }
};
