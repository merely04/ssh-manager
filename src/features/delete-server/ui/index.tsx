import React, {useCallback} from 'react';
import {GoTrashcan} from 'react-icons/go';

import {submit} from '../model';
import cls from './index.module.scss';

export type DeleteServerButtonProps = {
  serverId: string;
};

export const DeleteServerButton = ({serverId}: DeleteServerButtonProps) => {
  const onButtonClick = useCallback(() => {
    submit({id: serverId});
  }, [serverId]);

  return (
    <button onClick={onButtonClick} className={cls.button}>
      <GoTrashcan size={16} />
    </button>
  );
};
