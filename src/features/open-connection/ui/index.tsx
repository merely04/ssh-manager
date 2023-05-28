import {Link} from 'atomic-router-react';
import {GoZap} from 'react-icons/go';

import {routes} from '~/shared/routes';

import cls from './index.module.scss';

interface OpenConnectionLinkProps {
  serverId: string;
}

export const OpenConnectionLink = (props: OpenConnectionLinkProps) => {
  const {serverId} = props;

  return (
    <Link to={routes.connection} params={{serverId}} className={cls.link}>
      <GoZap size={16} />
    </Link>
  );
};
