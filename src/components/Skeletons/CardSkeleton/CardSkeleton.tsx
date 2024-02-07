import Skeleton from '@mui/material/Skeleton/Skeleton';
import React from 'react';
import classNames from 'classnames/bind';

import Styles from './CardSekeleton.module.scss';

const cx = classNames.bind(Styles);

const CardSkeleton = () => {
  return (
    <div className={cx('skeleton-container')}>
      <Skeleton variant="rounded" width={284} height={52} />
      <Skeleton style={{ marginTop: '5px' }} variant="rectangular" width={284} height={400} />
      <Skeleton style={{ marginTop: '5px' }} variant="rounded" width={284} height={32} />
    </div>
  );
};

export default CardSkeleton;
