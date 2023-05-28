import {ReactNode} from 'react';

import {Server} from '~/shared/api';

import cls from './index.module.scss';

type ServerRowProps = {
  data: Server;
  after?: ReactNode;
};

export const ServerRow = ({data, after}: ServerRowProps) => {
  return (
    <div className={cls.row}>
      <div>
        <h2 className={cls.name}>{data.name}</h2>
        <p className={cls.info}>
          {data.username}@{data.host}
        </p>
      </div>

      <div className={cls.actions}>{after}</div>
    </div>
  );
};
