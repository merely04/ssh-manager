import classNames from 'classnames';
import {ButtonHTMLAttributes, PropsWithChildren} from 'react';

import cls from './index.module.scss';

export enum ButtonTheme {
  PRIMARY = 'primary',
  RED = 'red',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  theme?: ButtonTheme;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button = (props: ButtonProps) => {
  const {
    className,
    theme = ButtonTheme.PRIMARY,
    disabled,
    fullWidth,
    children,
    ...otherProps
  } = props;

  const mods = {
    [cls[theme]]: true,
    [cls.disabled]: disabled,
    [cls.fullWidth]: fullWidth,
  };

  return (
    <button className={classNames(cls.button, mods, className)} {...otherProps}>
      {children}
    </button>
  );
};
