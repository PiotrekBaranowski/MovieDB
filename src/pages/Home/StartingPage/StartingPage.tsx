import React from 'react';
import classNames from 'classnames/bind';

import Styles from './StartingPage.module.scss';

const cx = classNames.bind(Styles);

const StartingPage = () => {
  return (
    <div className={cx('container')}>
      <h1>Page created to practice Front-End developer skills.</h1>
      <p>
        Page is imitation of{' '}
        <a className={cx('hiperlink')} href="https://www.tvmaze.com" target="_blank">
          www.tvmaze.com
        </a>{' '}
        and it uses freeware tvmazeAPI
      </p>
    </div>
  );
};

export default StartingPage;
