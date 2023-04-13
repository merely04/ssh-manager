import styles from './index.module.scss';
import {GoZap} from 'react-icons/go';
import {startServerModel} from '..';

export type StartServerButton = {
  serverId: string;
}

export const StartServerButton = ({serverId}: StartServerButton) => {
  function onButtonClick() {
    startServerModel.events.startServer({id: serverId});
  }

  return (
    <button onClick={onButtonClick} className={styles.button}>
      <GoZap size={16}/>
    </button>
  );
};