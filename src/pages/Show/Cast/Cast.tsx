import classNames from 'classnames/bind';
import { Skeleton } from '@mui/material';
import { useSelector } from 'react-redux';

import styles from './Cast.module.scss';

import CastCard from 'src/pages/Show/Cast/CastCard/CastCard';
import { RootState } from 'src/config/redux/config';
import { ShowInfoState } from 'src/state/ShowInfoReducer/types';
import { AppLoadingState } from 'src/state/AppLoadingReducer/types';

const cx = classNames.bind(styles);

const Cast = () => {
  const showInfo = useSelector<RootState, ShowInfoState>((state) => state.show);
  const isAppLoading = useSelector<RootState, AppLoadingState>((state) => state.appLoading);

  return (
    <div className={cx('container')}>
      {isAppLoading.showInfoisLoading ? (
        <>
          <div className={cx('cast-skeleton')}>
            <Skeleton variant="rectangular" width={250} height={350} />
            <Skeleton variant="rectangular" style={{ marginTop: '5px' }} width={250} height={20} />
          </div>
          <div className={cx('cast-skeleton')}>
            <Skeleton variant="rectangular" width={250} height={350} />
            <Skeleton variant="rectangular" style={{ marginTop: '5px' }} width={250} height={20} />
          </div>
          <div className={cx('cast-skeleton')}>
            <Skeleton variant="rectangular" width={250} height={350} />
            <Skeleton variant="rectangular" style={{ marginTop: '5px' }} width={250} height={20} />
          </div>
          <div className={cx('cast-skeleton')}>
            <Skeleton variant="rectangular" width={250} height={350} />
            <Skeleton variant="rectangular" style={{ marginTop: '5px' }} width={250} height={20} />
          </div>
        </>
      ) : (
        showInfo.cast?.map((person) => (
          <div className={cx('cast-container')} key={person.characterName}>
            <div>
              <CastCard image={person.imageUrl ?? 'https://www.cmu.edu/chemistry/people/staff/images/no-image.png'} />
              <div className={cx('cast-name')}>
                {person.personName} as {person.characterName}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cast;
