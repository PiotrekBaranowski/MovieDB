import classNames from 'classnames/bind';
import Skeleton from '@mui/material/Skeleton/Skeleton';
import { useSelector } from 'react-redux';

import styles from './Seasons.module.scss';

import CastCard from 'src/pages/Show/Cast/CastCard/CastCard';
import { RootState } from 'src/config/redux/config';
import { ShowInfoState } from 'src/state/ShowInfoReducer/types';
import { AppLoadingState } from 'src/state/AppLoadingReducer/types';

const cx = classNames.bind(styles);

const Seasons = () => {
  const showInfo = useSelector<RootState, ShowInfoState>((state) => state.show);
  const isAppLoading = useSelector<RootState, AppLoadingState>((state) => state.appLoading);

  return (
    <div className={cx('container')}>
      {isAppLoading.showInfoisLoading ? (
        <>
          <div className={cx('season-container')}>
            <Skeleton style={{ marginTop: '5px' }} variant="rectangular" width={250} height={350} />
            <div className={cx('season-text')}>
              <Skeleton style={{ marginTop: '5px' }} variant="rectangular" width={80} height={16} />
              <Skeleton style={{ marginTop: '5px' }} variant="rectangular" width={90} height={16} />
              <Skeleton style={{ marginTop: '5px' }} variant="rectangular" width={186} height={16} />
              <Skeleton style={{ marginTop: '5px' }} variant="rectangular" width={250} height={40} />
            </div>
          </div>
        </>
      ) : (
        showInfo.season?.map((season) => (
          <div key={season.number} className={cx('season-container')}>
            <CastCard
              image={
                season.imageUrl ??
                'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg'
              }
            />
            <div className={cx('season-text')}>
              <div>season {season.number}</div>
              {season.platform && <div>On {season.platform}</div>}
              {season.premiereDate && <div>Date of release {season.premiereDate}</div>}
              {season.summary && (
                <>
                  <span>Description</span>
                  <p dangerouslySetInnerHTML={{ __html: season.summary }} />
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export default Seasons;
