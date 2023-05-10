import {createRouteView} from 'atomic-router-react';

import {Loader} from '~/widgets/loader';

import {currentRoute, postLoadedRoute} from './model';
import {ConnectionPage} from './ui';

export const ConnectionRoute = {
  // @ts-ignore
  view: createRouteView({route: postLoadedRoute, view: ConnectionPage, otherwise: Loader}),
  route: currentRoute,
};
