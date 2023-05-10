import {reflect} from '@effector/reflect';
import {Link} from 'atomic-router-react';
import React, {useState} from 'react';
import {GoZap} from 'react-icons/go';

import {CreateServerModal} from '~/features/create-server';
import {DeleteServerButton} from '~/features/delete-server';

import {serverModel, ServerRow} from '~/entities/server';

import {Server} from '~/shared/api';
import {routes} from '~/shared/routes';
import {Container} from '~/shared/ui';

import cls from './index.module.scss';

type Props = {
  servers: Server[];
  isLoading: boolean;
  isEmpty: boolean;
};

const View = ({servers, isLoading, isEmpty}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Container className={cls.main}>
      <h1 className={cls.title}>ssh manager</h1>

      <div className={cls.main}>
        <header className={cls.header}>
          Список серверов
          <div className={cls.actions_list}>
            <button className={cls.button} onClick={openModal}>
              + Добавить
            </button>
            <CreateServerModal isOpen={isModalOpen} handleClose={closeModal} />
          </div>
        </header>

        <div>
          {isLoading && <p>loading...</p>}
          {!isLoading && isEmpty && <p>No servers found</p>}
          {!isLoading && (
            <div className={cls.row}>
              {servers.map((server) => {
                return (
                  <div key={server.id}>
                    <ServerRow
                      data={server}
                      after={
                        <>
                          {/*<StartServerButton serverId={server.id} />*/}
                          <Link
                            to={routes.connection}
                            params={{serverId: server.id}}
                            className={cls.button}
                          >
                            <GoZap size={16} />
                          </Link>
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
    </Container>
  );
};

export const HomePage = reflect({
  view: View,
  bind: {
    servers: serverModel.$servers,
    isLoading: serverModel.$serversLoading,
    isEmpty: serverModel.$serversEmpty,
  },
  hooks: {
    mounted: serverModel.pageMounted,
  },
});
