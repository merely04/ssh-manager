import {useList, useUnit} from 'effector-react';
import React, {memo} from 'react';

import {CreateServerModal, createServerModel} from '~/features/create-server';
import {DeleteServerButton} from '~/features/delete-server';
import {OpenConnectionLink} from '~/features/open-connection';

import {serverModel, ServerRow} from '~/entities/server';

import {Container} from '~/shared/ui';
import {Button} from '~/shared/ui/button';

import {$loading} from '../model';
import cls from './index.module.scss';

export const HomePage = () => {
  const openModal = useUnit(createServerModel.open);

  return (
    <Container className={cls.main}>
      <h1 className={cls.title}>ssh manager</h1>

      <div className={cls.main}>
        <header className={cls.header}>
          Список серверов
          <div className={cls.actions_list}>
            <Button onClick={openModal} className={cls.add_button}>
              + Добавить
            </Button>
            <CreateServerModal />
          </div>
        </header>

        <PageContent />
      </div>
    </Container>
  );
};

const PageContent = memo(() => {
  const [loading, isEmpty] = useUnit([$loading, serverModel.$serversEmpty]);

  const serversList = useList(serverModel.$servers, {
    getKey: (server) => server.id,
    fn: (server) => (
      <div key={server.id}>
        <ServerRow
          data={server}
          after={
            <>
              <OpenConnectionLink serverId={server.id} />
              <DeleteServerButton serverId={server.id} />
            </>
          }
        />
      </div>
    ),
  });

  return (
    <div>
      {loading && <p>Загрузка...</p>}
      {!loading && isEmpty && <p>Ни один сервер еще не добавлен</p>}
      {!loading && <div className={cls.row}>{serversList}</div>}
    </div>
  );
});
