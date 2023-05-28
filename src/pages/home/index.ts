import {createRouteView} from 'atomic-router-react';

import {currentRoute, postLoadedRoute} from './model';
import {HomePage} from './ui';

export const HomeRoute = {
  view: createRouteView({
    route: postLoadedRoute,
    view: HomePage,
    otherwise: HomePage,
  }),
  route: currentRoute,
};
