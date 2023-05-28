import {useUnit} from 'effector-react';
import {GoTrashcan} from 'react-icons/go';

import {Button, ButtonTheme} from '~/shared/ui/button';

import {deleteButtonClick} from '../model';

interface DeleteServerButtonProps {
  serverId: string;
}

export const DeleteServerButton = ({serverId}: DeleteServerButtonProps) => {
  const onButtonClick = useUnit(deleteButtonClick);

  return (
    <Button onClick={() => onButtonClick(serverId)} theme={ButtonTheme.RED}>
      <GoTrashcan size={16} />
    </Button>
  );
};
