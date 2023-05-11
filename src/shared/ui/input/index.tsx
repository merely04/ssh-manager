import classNames from 'classnames';
import {InputHTMLAttributes} from 'react';

import cls from './index.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  isInvalid?: boolean;
  center?: boolean;
}

export const Input = (props: InputProps) => {
  const {type = 'text', disabled, isInvalid, center, className, ...otherProps} = props;

  const mods = {
    [cls.disabled]: disabled,
    [cls.invalid]: isInvalid,
    [cls.center]: center,
  };

  return (
    <input
      className={classNames(cls.input, mods, [className])}
      type={type}
      disabled={disabled}
      {...otherProps}
    />
  );
};
