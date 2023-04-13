import {GoTrashcan} from 'react-icons/go';
import {deleteServerModel} from '..';
import styles from './index.module.scss';

export type DeleteServerButtonProps = {
  serverId: string;
}

export const DeleteServerButton = ({serverId}: DeleteServerButtonProps) => {
  function onButtonClick() {
    deleteServerModel.events.deleteServer({id: serverId});
  }

  return (
    <button onClick={onButtonClick} className={styles.button}>
      <GoTrashcan size={16}/>
    </button>
  );
};