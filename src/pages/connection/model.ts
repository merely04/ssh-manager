import {chainRoute, RouteInstance, RouteParams} from 'atomic-router';
import {sample} from 'effector';
import {createForm} from 'effector-forms';

import {connectionModel} from '~/entities/connection';

import {routes} from '~/shared/routes';

export const currentRoute = routes.connection;
export const postLoadedRoute = chainPostData(currentRoute);

export const $form = createForm({
  fields: {
    command: {
      init: '',
      validateOn: ['change'],
    },
  },
  validateOn: ['submit'],
});

sample({
  source: currentRoute.$params,
  clock: $form.formValidated,
  filter: ({serverId}) => Boolean(serverId),
  fn: ({serverId}, {command}) => ({id: serverId, command}),
  target: connectionModel.sendServerCommand,
});

sample({
  clock: connectionModel.sendServerCommandFx.done,
  target: $form.reset,
});

function chainPostData<Params extends RouteParams>(
  route: RouteInstance<Params>,
): RouteInstance<Params> {
  sample({
    clock: connectionModel.connectServerFx.fail,
    source: {params: route.$params, query: route.$query},
    filter: route.$isOpened,
    target: routes.error.open,
  });

  return chainRoute({
    route,
    beforeOpen: {
      effect: connectionModel.connectServerFx,
      mapParams: ({params}) => ({id: params.serverId}),
    },
    openOn: connectionModel.connectServerFx.done,
    cancelOn: connectionModel.connectServerFx.fail,
  });
}
