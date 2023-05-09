import {reflect} from '@effector/reflect';
import {useState} from 'react';

import {CreateServerModal} from '~/features/create-server';
import {DeleteServerButton} from '~/features/delete-server';
import {StartServerButton} from '~/features/start-server';

import {serverModel, ServerRow} from '~/entities/server';

import {localApi} from '~/shared/api';

import styles from './index.module.scss';

type Props = {
  servers: localApi.Server[];
  isLoading: boolean;
  isEmpty: boolean;
};

const View = ({servers, isLoading, isEmpty}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={`${styles.container} ${styles.main}`}>
      <h1 className={styles.title}>ssh manager</h1>

      <div className={styles.main}>
        <header className={styles.header}>
          Список серверов
          <div className={styles.actions_list}>
            <button className={styles.button} onClick={openModal}>
              + Добавить
            </button>
            <CreateServerModal isOpen={isModalOpen} handleClose={closeModal} />
          </div>
        </header>

        <div>
          {isLoading && <p>loading...</p>}
          {!isLoading && isEmpty && <p>No servers found</p>}
          {!isLoading && (
            <div className={styles.row}>
              {servers.map((server) => {
                return (
                  <div key={server.id}>
                    <ServerRow
                      data={server}
                      after={
                        <>
                          <StartServerButton serverId={server.id} />
                          <DeleteServerButton serverId={server.id} />
                        </>
                      }
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const HomePage = reflect({
  view: View,
  bind: {
    servers: serverModel.$servers,
    isLoading: serverModel.$serversLoading,
    isEmpty: serverModel.$serversEmpty,
  },
  hooks: {
    mounted: serverModel.events.pageMounted,
  },
});

export default HomePage;
