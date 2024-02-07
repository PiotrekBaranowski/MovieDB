import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import style from './FavShows.module.scss';

import { UserState } from 'src/state/user/types';
import { RootState } from 'src/config/redux/config';
import { AppRoutes } from 'src/types/routes';
import { FavShowState } from 'src/state/FavShowReducer/types';
import { getFavShowsForUser } from 'src/api/firebaseApi/firebaseApi';
import { useFirebaseApp } from 'src/config/firebase/config';
import TvShowCard from 'src/components/Card/TvShowCard/TvShowCard';

const cx = classNames.bind(style);

const FavShows = (): JSX.Element => {
  const userState = useSelector<RootState, UserState>((state) => state.user);
  const currentFavShowList = useSelector<RootState, FavShowState>((state) => state.favShows);
  const navigate = useNavigate();

  const { db } = useFirebaseApp();

  useEffect(() => {
    if (userState.isLogged === false) {
      navigate(AppRoutes.HOME, { replace: true });
    }
  }, [userState.uid]);

  useEffect(() => {
    getFavShowsForUser(userState.uid, db);
  }, [userState.uid, db]);

  return (
    <div className={cx('shows')}>
      {currentFavShowList.favShowList.length === 0 ? (
        <div>No favourite shows</div>
      ) : (
        currentFavShowList.favShowList.map((show) => (
          <div
            onClick={() => navigate(AppRoutes.HOME + show.showId + '/main')}
            key={show.showId}
            className={cx('show')}
          >
            <TvShowCard show={show} />
          </div>
        ))
      )}
    </div>
  );
};
export default FavShows;
