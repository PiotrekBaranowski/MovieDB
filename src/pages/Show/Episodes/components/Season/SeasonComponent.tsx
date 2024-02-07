import React, { Fragment, useState } from 'react';
import classNames from 'classnames/bind';

import Styles from './SeasonComponent.module.scss';

import { Episode } from 'src/state/SearchedShowsReducer/types';

interface SeasonProps {
  seasonNumber: number;
  key: React.Key | null | undefined;
  episodes: Episode[] | undefined;
}

const cx = classNames.bind(Styles);

const SeasonComponent = ({ seasonNumber, key, episodes }: SeasonProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <Fragment key={key}>
      <div className={cx('season')} onClick={() => setExpanded(!expanded)}>
        {expanded ? '-' : '+'} Season {seasonNumber}
      </div>
      {expanded &&
        episodes?.map((episode) =>
          episode.season === seasonNumber ? (
            <div className={cx('episode')} key={episode.number}>
              Episode {episode.number} {episode.name}
            </div>
          ) : (
            <></>
          )
        )}
    </Fragment>
  );
};

export default SeasonComponent;
