import classNames from 'classnames/bind';
import { CSSProperties } from 'react';

import Styles from './Label.module.scss';

export interface LabelProps {
  id: string;
  style?: CSSProperties;
  children: React.ReactNode;
  labelFor: string;
}

const cx = classNames.bind(Styles);

export const Label = ({ id, children, style, labelFor }: LabelProps): JSX.Element => {
  return (
    <label id={`${id}-label`} style={style} className={cx('input__label')} htmlFor={labelFor}>
      {children}
    </label>
  );
};
