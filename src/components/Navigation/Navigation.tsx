import classNames from 'classnames/bind';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Styles from './Navigation.module.scss';

import logo from 'src/assets/images/tvm-header-logo.png';
import Button from 'src/components/Button/Button';
import LoginForm from 'src/components/Navigation/LoginForm/LoginForm';
import RegisterForm from 'src/components/Navigation/RegisterForm/RegisterForm';
import { RootState, store } from 'src/config/redux/config';
import { UserState } from 'src/state/user/types';
import { userHasLoggedOut } from 'src/state/user/userReducer';
import { getListOfTvShowsFromApi } from 'src/api/TvMazeApi/TvMazeApi';
import { AppRoutes } from 'src/types/routes';
import { initialStateSearchedShowList } from 'src/state/SearchedShowsReducer/SearchedShowsReducer';

const cx = classNames.bind(Styles);

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector<RootState, UserState>((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoginForm, setIsLoginForm] = useState<boolean>(false);

  const [searchText, setSearchText] = useState<string>('');

  const onLogoClick = () => {
    location.pathname === '/' ? window.location.reload() : navigate(AppRoutes.HOME);
    store.dispatch(initialStateSearchedShowList());
  };

  const removeSearchText = () => {
    setSearchText('');
  };

  const onSearch = (e) => {
    e.preventDefault();
    navigate(AppRoutes.HOME);
    getListOfTvShowsFromApi(searchText);
  };

  return (
    <nav className={cx('navigation')}>
      <div className={cx('logo')}>
        <img onClick={onLogoClick} src={logo} alt="TVMaze logo" />
      </div>
      <div className={cx('search-space')}>
        <form className={cx('search-bar')} onSubmit={onSearch}>
          <input
            className={cx('search-bar-input')}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search Shows"
          />
          {searchText && (
            <div onClick={removeSearchText} className={cx('close-icon')}>
              <HighlightOffIcon style={{ color: 'darkgrey', fontWeight: 'bold' }} />
            </div>
          )}
          <Button
            variant="primary"
            type="submit"
            isDisabled={searchText === ''}
            style={{
              borderBottomRightRadius: '40px',
              borderTopRightRadius: '40px',
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '00px',
              padding: '5px 30px',
            }}
          >
            <SearchIcon className={cx('icon')} />
          </Button>
        </form>
      </div>
      <div className={cx('account-management')}>
        {user.isLogged === false ? (
          <>
            <Button
              handleClick={() => {
                setIsModalOpen(true);
                setIsLoginForm(true);
              }}
              variant="terthiary"
              style={{ marginLeft: '20px' }}
            >
              Login
            </Button>
            <Button
              handleClick={() => {
                setIsModalOpen(true);
                setIsLoginForm(false);
              }}
              variant="terthiary"
              style={{ marginLeft: '20px' }}
            >
              Register
            </Button>
          </>
        ) : (
          <>
            <IconButton
              disableRipple={true}
              onClick={
                user.isLogged
                  ? () => navigate(AppRoutes.FAVSHOWLIST)
                  : () => {
                      setIsModalOpen(true);
                      setIsLoginForm(true);
                    }
              }
              aria-label="Favourites"
            >
              <FavoriteIcon className={cx('icon-button')} style={{ fontSize: '30px' }} />
            </IconButton>
            <IconButton disableRipple={true} aria-label="Account" onClick={() => {}}>
              <AccountCircleIcon className={cx('icon-button')} style={{ fontSize: '30px' }} />
            </IconButton>
            <Button
              handleClick={() => {
                if (location.pathname === '/user-shows') {
                  navigate(AppRoutes.HOME);
                }
                store.dispatch(userHasLoggedOut());
              }}
              variant="primary"
              style={{ marginLeft: '10px' }}
            >
              Log out
            </Button>
          </>
        )}
      </div>
      {isModalOpen &&
        (isLoginForm ? (
          <LoginForm setIsLoginForm={setIsLoginForm} setModal={setIsModalOpen} />
        ) : (
          <RegisterForm setIsLoginForm={setIsLoginForm} setModal={setIsModalOpen} />
        ))}
    </nav>
  );
};

export default Navigation;
