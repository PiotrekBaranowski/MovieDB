import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import style from './TvShowCard.module.scss';

import { AppRoutes } from 'src/types/routes';
import { TvShow } from 'src/state/SearchedShowsReducer/types';

interface TvShowCardProps {
  show: TvShow;
}

const cx = classNames.bind(style);

const TvShowCard = ({ show }: TvShowCardProps): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(AppRoutes.HOME + show.showId + '/main');
  };
  return (
    <Card className={cx('card')} onClick={handleClick} style={{ cursor: 'pointer' }} sx={{ maxWidth: 285 }}>
      <CardHeader style={{ backgroundColor: '#FFFEE0' }} title={show.name} />
      <CardMedia
        component="img"
        height="400"
        style={{ width: '285px' }}
        image={show.imageUrl}
        alt={`${show.name} photo`}
      />
      <CardActions disableSpacing>
        <div>
          rating: {show.rating}
          {show.platform && ','}
        </div>
        {show.platform && <div>&nbsp;&nbsp;show on {show.platform}</div>}
      </CardActions>
    </Card>
  );
};
export default TvShowCard;
