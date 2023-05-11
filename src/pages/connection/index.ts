import {createRouteView} from 'atomic-router-react';

import {Loader} from '~/widgets/loader';

import {routes} from '~/shared/routes';

import {currentRoute, postLoadedRoute} from './model';
import {ConnectionPage} from './ui';

export const ConnectionRoute = {
  view: createRouteView({
    // @ts-ignore
    route: postLoadedRoute,
    // @ts-ignore
    view: ConnectionPage,
    otherwise: () => Loader({routeBack: routes.home}),
  }),
  route: currentRoute,
};
