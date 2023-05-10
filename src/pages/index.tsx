import {createRoutesView} from 'atomic-router-react';

import {ConnectionRoute} from '~/pages/connection';
import {HomeRoute} from '~/pages/home';

export const Pages = createRoutesView({
  routes: [HomeRoute, ConnectionRoute],
  otherwise: () => <p>Not found</p>,
});
