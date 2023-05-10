import {ReactNode} from 'react';

import * as api from '~/shared/api';

import styles from './index.module.scss';

type ServerRowProps = {
  data: api.Server;
  after?: ReactNode;
};

export const ServerRow = ({data, after}: ServerRowProps) => {
  return (
    <div className={styles.row}>
      <div>
        <h2 className={styles.name}>{data.name}</h2>
        <p className={styles.info}>
          {data.username}@{data.host}
        </p>
      </div>

      <div className={styles.actions}>{after}</div>
    </div>
  );
};
