import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router';
import Skeleton from '@mui/material/Skeleton/Skeleton';
import { useSelector } from 'react-redux';

import styles from './Show.module.scss';

import { getAllInfoOfShow } from 'src/api/TvMazeApi/TvMazeApi';
import Navigation from 'src/pages/Show/components/Navigation/Navigation';
import { ShowInfoState } from 'src/state/ShowInfoReducer/types';
import { RootState } from 'src/config/redux/config';
import { AppLoadingState } from 'src/state/AppLoadingReducer/types';

const cx = classNames.bind(styles);

const Show = () => {
  const { showId } = useParams();
  const showInfo = useSelector<RootState, ShowInfoState>((state) => state.show);
  const isAppLoading = useSelector<RootState, AppLoadingState>((state) => state.appLoading);

  useEffect(() => {
    const fetchData = async () => {
      if (showId !== undefined && showId !== showInfo.show?.showId) {
        await getAllInfoOfShow(showId);
      }
    };
    fetchData();
  }, [showId]);

  return (
    <div className={cx('container')}>
      <header>
        {isAppLoading.showInfoisLoading ? (
          <Skeleton
            style={{ marginTop: '20px', marginBottom: '20px' }}
            variant="rectangular"
            height={32}
            width={300}
            animation="wave"
          />
        ) : (
          <h1>{showInfo?.show?.name ?? 'No name info'}</h1>
        )}
      </header>
      <Navigation id={showId} />
      <Outlet />
    </div>
  );
};

export default Show;
