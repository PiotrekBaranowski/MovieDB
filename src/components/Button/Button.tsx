import classNames from 'classnames/bind';

import Styles from './Button.module.scss';

const cx = classNames.bind(Styles);

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'terthiary';
  type?: 'button' | 'submit' | 'reset' | undefined;
  isDisabled?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
  handleClick?: () => void;
}

const Button = ({
  variant,
  type = 'button',
  isDisabled = false,
  style = undefined,
  children,
  handleClick = undefined,
}: ButtonProps) => {
  return (
    <button
      onClick={handleClick}
      type={type}
      disabled={isDisabled}
      style={style}
      className={cx('button', `${variant}`)}
    >
      {children}
    </button>
  );
};

export default Button;
