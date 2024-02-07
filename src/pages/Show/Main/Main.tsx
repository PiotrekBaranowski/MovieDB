import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import Skeleton from '@mui/material/Skeleton/Skeleton';

import styles from './Main.module.scss';

import { addFavShowToDB, deleteFavShowFromDB, getFavShowsForUser } from 'src/api/firebaseApi/firebaseApi';
import { useFirebaseApp } from 'src/config/firebase/config';
import { RootState, store } from 'src/config/redux/config';
import ShowCard from 'src/pages/Show/components/Card/ShowCard';
import { FavShowState } from 'src/state/FavShowReducer/types';
import { UserState } from 'src/state/user/types';
import { setFavShowsInitialState } from 'src/state/FavShowReducer/FavShowsReducer';
import FollowSnackbar from 'src/pages/Show/Main/components/FollowSnackbar/FollowSnackbar';
import { SnackbarMessageType } from 'src/pages/Show/Main/types';
import { ShowInfoState } from 'src/state/ShowInfoReducer/types';
import { AppLoadingState } from 'src/state/AppLoadingReducer/types';

const cx = classNames.bind(styles);

const Main = () => {
  const { showId } = useParams();
  const favShowState = useSelector<RootState, FavShowState>((state) => state.favShows);
  const userState = useSelector<RootState, UserState>((state) => state.user);
  const showInfo = useSelector<RootState, ShowInfoState>((state) => state.show);
  const isAppLoading = useSelector<RootState, AppLoadingState>((state) => state.appLoading);
  const showIsFollowed = favShowState.favShowList.find((show) => show.showId == showId);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackBarMessage] = useState<SnackbarMessageType>({
    success: undefined,
  });

  const { db } = useFirebaseApp();

  useEffect(() => {
    if (userState.uid === '') {
      store.dispatch(setFavShowsInitialState());
    }
    if (userState.uid !== '') getFavShowsForUser(userState.uid, db);
  }, [userState.uid]);

  const handleFavouritesClick = async (): Promise<void> => {
    if (showIsFollowed === undefined) {
      if (userState.uid && showInfo.show !== undefined) {
        const added = await addFavShowToDB(db, showInfo.show, userState.uid);
        setSnackBarMessage(added);
        setOpenSnackbar(true);
      } else {
        setSnackBarMessage({ failure: 'user needs to sign in first!' });
        setOpenSnackbar(true);
      }
    } else {
      const deleted = await deleteFavShowFromDB(showIsFollowed.id, userState.uid, db);
      setSnackBarMessage(deleted);
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <div className={cx('container')}>
        {isAppLoading.showInfoisLoading ? (
          <div className={cx('main-tab-container')}>
            <div className={cx('skeleton-card')}>
              <Skeleton variant="rounded" width={250} height={350} />
              <Skeleton style={{ marginTop: '2px' }} variant="rounded" width={250} height={50} />
            </div>
            <div className={cx('skeleton-summary')}>
              <Skeleton variant="rectangular" height={100} width={445} />
            </div>
            <div className={cx('skeleton-tab-info')}>
              <Skeleton variant="rectangular" height={40} width={145} />
            </div>
          </div>
        ) : (
          showInfo?.show && (
            <div className={cx('main-tab-container')}>
              <>
                <div className={cx('main-tab-card')}>
                  <ShowCard
                    image={showInfo.show.imageUrl}
                    isFollowed={!(showIsFollowed === undefined)}
                    handleFavouritesClick={handleFavouritesClick}
                    isLoading={isAppLoading.favShowsisLoading}
                  />
                </div>
                <div className={cx('main-tab-summary')}>
                  <div>Show description:</div>
                  <div
                    className={cx('summary')}
                    dangerouslySetInnerHTML={{ __html: showInfo.show.summary ?? 'No information yet' }}
                  />
                </div>
                <div className={cx('main-tab-info')}>
                  <div className={cx('info')}> show info </div>
                  <div className={cx('info')}>Rating {showInfo.show.rating}</div>
                  <div className={cx('info')}>Platform {showInfo.show.platform}</div>
                </div>
              </>
            </div>
          )
        )}
      </div>
      <FollowSnackbar
        handleCloseSnackbar={() => setOpenSnackbar(false)}
        openSnackbar={openSnackbar}
        snackbarMessage={snackbarMessage}
      />
    </>
  );
};

export default Main;
