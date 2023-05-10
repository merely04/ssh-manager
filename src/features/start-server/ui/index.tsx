import React, {useCallback} from 'react';
import {GoZap} from 'react-icons/go';

import {submit} from '../model';
import cls from './index.module.scss';

interface StartServerButtonProps {
  serverId: string;
}

export const StartServerButton = (props: StartServerButtonProps) => {
  const {serverId} = props;

  const onButtonClick = useCallback(() => {
    submit({id: serverId});
  }, [serverId]);

  return (
    <button onClick={onButtonClick} className={cls.button}>
      <GoZap size={16} />
    </button>
  );
};
