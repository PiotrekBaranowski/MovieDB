import classNames from 'classnames/bind';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircularProgress from '@mui/material/CircularProgress';

import styles from './ShowCard.module.scss';

const cx = classNames.bind(styles);

interface ShowCardProps {
  isLoading?: boolean;
  image?: string;
  isFollowed?: boolean;
  handleFavouritesClick: () => void;
}

const ShowCard = ({ isLoading, image, isFollowed, handleFavouritesClick }: ShowCardProps) => {
  const noPhoto = () => {
    if (image === 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg') {
      return { width: '284.74px' };
    }
    return undefined;
  };

  return (
    <Card className={cx('card')} style={{ width: '250px' }}>
      <CardMedia component="img" height="350" style={noPhoto()} image={image} />
      <CardActions
        className={cx(
          'fav-icon-container',
          isFollowed ? 'fav-icon-container-followed' : 'fav-icon-container-notFollowed'
        )}
        style={{ padding: '0' }}
        disableSpacing
      >
        <IconButton
          disabled={isLoading}
          onClick={() => {
            handleFavouritesClick();
          }}
          className={cx(
            'fav-icon-button',
            isFollowed ? 'fav-icon-button-followed' : 'fav-icon-button-notFollowed',
            isLoading && 'fav-icon-button-loading'
          )}
          aria-label="add to favorites"
        >
          {' '}
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <FavoriteIcon />
              <span className={cx('follow-text')}>{isFollowed ? 'Unfollow' : 'Follow'}</span>
            </>
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ShowCard;
