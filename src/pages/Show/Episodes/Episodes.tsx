import classNames from 'classnames/bind';
import Skeleton from '@mui/material/Skeleton/Skeleton';
import { useSelector } from 'react-redux';

import styles from './Episodes.module.scss';

import SeasonComponent from 'src/pages/Show/Episodes/components/Season/SeasonComponent';
import { RootState } from 'src/config/redux/config';
import { ShowInfoState } from 'src/state/ShowInfoReducer/types';
import { AppLoadingState } from 'src/state/AppLoadingReducer/types';

const cx = classNames.bind(styles);

const Episodes = () => {
  const showInfo = useSelector<RootState, ShowInfoState>((state) => state.show);
  const isAppLoading = useSelector<RootState, AppLoadingState>((state) => state.appLoading);

  return (
    <div className={cx('container')}>
      {isAppLoading.showInfoisLoading ? (
        <>
          <Skeleton style={{ marginTop: '5px' }} variant="rectangular" width={50} height={16} />
          <Skeleton style={{ marginTop: '5px' }} variant="rectangular" width={140} height={16} />
          <Skeleton style={{ marginTop: '5px' }} variant="rectangular" width={140} height={16} />
          <Skeleton style={{ marginTop: '5px' }} variant="rectangular" width={140} height={16} />
          <Skeleton style={{ marginTop: '5px' }} variant="rectangular" width={50} height={16} />
          <Skeleton style={{ marginTop: '5px' }} variant="rectangular" width={140} height={16} />
          <Skeleton style={{ marginTop: '5px' }} variant="rectangular" width={140} height={16} />
          <Skeleton style={{ marginTop: '5px' }} variant="rectangular" width={140} height={16} />
        </>
      ) : (
        showInfo.season?.map((season) => (
          <SeasonComponent episodes={showInfo.episode} key={season.number} seasonNumber={season.number} />
        ))
      )}
    </div>
  );
};
export default Episodes;
