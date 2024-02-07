import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router';

import styles from './Navigation.module.scss';

const cx = classNames.bind(styles);

interface NavigationProps {
  id: string | undefined;
}

const Navigation = ({ id }: NavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (id !== undefined) navigate(newValue);
  };

  return (
    <div className={cx('container')}>
      <Box sx={{ width: '100%' }}>
        <Tabs
          className={cx('tabs')}
          value={value}
          onChange={handleChange}
          textColor="inherit"
          TabIndicatorProps={{
            sx: {
              backgroundColor: '#3c948b',
            },
          }}
          aria-label="secondary tabs example"
        >
          <Tab value={`/${id}/main`} label="Main" />
          <Tab value={`/${id}/episodes`} label="Episodes" />
          <Tab value={`/${id}/seasons`} label="Seasons" />
          <Tab value={`/${id}/cast`} label="Cast" />
        </Tabs>
      </Box>
    </div>
  );
};

export default Navigation;
