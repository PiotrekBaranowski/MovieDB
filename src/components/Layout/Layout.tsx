import classNames from 'classnames/bind';
import { Outlet } from 'react-router';

import styles from './Layout.module.scss';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';

const cx = classNames.bind(styles);

const Layout = (): JSX.Element => {
  return (
    <div className={cx('body-page')}>
      <Navigation />
      <div className={cx('content-container')}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
