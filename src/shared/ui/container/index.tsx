import classNames from 'classnames';
import {HTMLAttributes, ReactNode} from 'react';

import cls from './index.module.scss';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

export const Container = (props: ContainerProps) => {
  const {className, children, ...otherProps} = props;

  return (
    <div className={classNames(cls.container, [className])} {...otherProps}>
      {children}
    </div>
  );
};
