import classNames from 'classnames/bind';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

import styles from './CastCard.module.scss';

const cx = classNames.bind(styles);

interface CastCardProps {
  image: string;
}

const CastCard = ({ image }: CastCardProps) => {
  return (
    <Card className={cx('card')} style={{ width: '250px' }}>
      <CardMedia component="img" height="350" style={{ width: '250px' }} image={image} />
    </Card>
  );
};

export default CastCard;
