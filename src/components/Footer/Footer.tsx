import classNames from 'classnames/bind';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={cx('footer')}>
      Project inspired by{' '}
      <a className={cx('hiperlink')} href="https://www.tvmaze.com" target="_blank">
        www.tvmaze.com
      </a>
    </footer>
  );
};

export default Footer;
