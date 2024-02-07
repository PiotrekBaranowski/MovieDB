import classNames from 'classnames/bind';

import Styles from './Search.module.scss';

import { SearchedShows } from 'src/state/SearchedShowsReducer/types';
import TvShowCard from 'src/components/Card/TvShowCard/TvShowCard';
import CardSkeleton from 'src/components/Skeletons/CardSkeleton/CardSkeleton';
import { AppLoadingState } from 'src/state/AppLoadingReducer/types';

const cx = classNames.bind(Styles);

interface SearchProps {
  tvShowSearchList: SearchedShows;
  appIsLoadingState: AppLoadingState;
}

const Search = ({ tvShowSearchList, appIsLoadingState }: SearchProps) => {
  return (
    <div className={cx('shows')}>
      {appIsLoadingState.searchedShowsisLoading ? (
        <div className={cx('shows-skeleton')}>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : tvShowSearchList?.searchedShowsList[0]?.name === 'no_show_found' ? (
        <div>No data found</div>
      ) : (
        tvShowSearchList.searchedShowsList.map((show) => (
          <div key={show.showId} className={cx('show')}>
            <TvShowCard show={show} />
          </div>
        ))
      )}
    </div>
  );
};

export default Search;
