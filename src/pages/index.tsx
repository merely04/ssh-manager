import {createRoutesView} from 'atomic-router-react';

import {ConnectionRoute} from '~/pages/connection';
import {ErrorRoute} from '~/pages/error';
import {HomeRoute} from '~/pages/home';

export const Pages = createRoutesView({
  routes: [HomeRoute, ConnectionRoute, ErrorRoute],
  otherwise: () => <p>Not found</p>,
});
