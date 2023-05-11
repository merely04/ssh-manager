import {createHistoryRouter, createRoute, createRouterControls} from 'atomic-router';
import {sample} from 'effector';
import {createBrowserHistory, createMemoryHistory} from 'history';

import {appStarted} from '~/shared/config/init';

export const routes = {
  home: createRoute(),
  connection: createRoute<{serverId: string}>({}),
};

export const controls = createRouterControls();

export const router = createHistoryRouter({
  routes: [
    {
      path: '/',
      route: routes.home,
    },
    {
      path: '/connection/:serverId',
      route: routes.connection,
    },
  ],
  controls,
});

sample({
  clock: appStarted,
  fn: () => (import.meta.env.DEV ? createBrowserHistory() : createMemoryHistory()),
  target: router.setHistory,
});
