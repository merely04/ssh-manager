import {chainRoute, RouteInstance, RouteParams} from 'atomic-router';
import {createStore, sample} from 'effector';
import {createForm} from 'effector-forms';
import {attach} from 'effector/compat';

import * as api from '~/shared/api';
import {routes} from '~/shared/routes';
import {rules} from '~/shared/rules';

export const currentRoute = routes.connection;
export const connectServerFx = attach({effect: api.connectServerFx});

export const sendServerCommandFx = attach({effect: api.sendServerCommandFx});

export const $messages = createStore<api.Message[]>([])
  .on(connectServerFx.doneData, (_, payload) => [payload])
  .on(sendServerCommandFx.doneData, (state, payload) => [...state, payload]);

export const $loading = connectServerFx.pending;

export const $form = createForm({
  fields: {
    command: {
      init: '',
      rules: [rules.required()],
      validateOn: ['change'],
    },
  },
  validateOn: ['submit'],
});

sample({
  clock: $form.formValidated,
  source: currentRoute.$params,
  filter: ({serverId}) => Boolean(serverId),
  fn: ({serverId}, {command}) => {
    console.log(serverId);
    return {id: serverId, command};
  },
  target: sendServerCommandFx,
});

sample({
  clock: sendServerCommandFx.done,
  target: $form.reset,
});

function chainPostData<Params extends RouteParams>(
  route: RouteInstance<Params>,
): RouteInstance<Params> {
  sample({
    clock: connectServerFx.fail,
    source: {params: route.$params, query: route.$query},
    filter: route.$isOpened,
    target: routes.error.open,
  });

  return chainRoute({
    route,
    beforeOpen: {
      effect: connectServerFx,
      mapParams: ({params}) => ({id: params.serverId}),
    },
    openOn: connectServerFx.done,
    cancelOn: connectServerFx.fail,
  });
}

export const postLoadedRoute = chainPostData(currentRoute);
