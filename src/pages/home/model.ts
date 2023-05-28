import {chainRoute, RouteInstance, RouteParams} from 'atomic-router';
import {attach, sample} from 'effector';

import {serverModel} from '~/entities/server';

import * as api from '~/shared/api';
import {routes} from '~/shared/routes';

export const currentRoute = routes.home;

const getServersFx = attach({effect: api.getServersFx});

export const $loading = getServersFx.pending;

serverModel.$servers.on(getServersFx.doneData, (_, payload) => payload);

export const postLoadedRoute = chainPostData(currentRoute);

function chainPostData<Params extends RouteParams>(
  route: RouteInstance<Params>,
): RouteInstance<Params> {
  sample({
    clock: getServersFx.fail,
    source: {params: route.$params, query: route.$query},
    filter: route.$isOpened,
    target: routes.error.open,
  });

  return chainRoute({
    route,
    beforeOpen: {
      effect: getServersFx,
      mapParams: ({params}) => ({id: params.serverId}),
    },
    openOn: getServersFx.done,
    cancelOn: getServersFx.fail,
  });
}
