import classNames from 'classnames/bind';
import { CSSProperties } from 'react';

import Styles from './Input.module.scss';

export interface InputProps {
  placeholder: string;
  id: string;
  type: React.HTMLInputTypeAttribute;
  value: string | number;
  handleChange: (value: string) => void;
  style?: CSSProperties;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const cx = classNames.bind(Styles);

export const Input = ({ placeholder, value, id, type, style, onBlur, handleChange }: InputProps): JSX.Element => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      className={cx('input__textBox')}
      style={style}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      id={`${id}-input`}
      onBlur={onBlur}
    />
  );
};
