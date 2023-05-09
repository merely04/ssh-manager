import {createEffect, createEvent, createStore, sample} from 'effector';

import {localApi} from '~/shared/api';

const pageMounted = createEvent();

const getServersListFx = createEffect(async () => {
  return localApi.servers.getServersList();
});

const createServerFx = createEffect((params: localApi.servers.CreateServerParams) => {
  return localApi.servers.createServer(params);
});

const deleteServerFx = createEffect((params: localApi.servers.DeleteServerParams) => {
  localApi.servers.deleteServer(params);
  return params.id;
});

const startServerFx = createEffect((params: localApi.servers.StartServerParams) => {
  localApi.servers.startServer(params);
});

export const $servers = createStore<localApi.Server[]>([])
  .on(getServersListFx.doneData, (_, payload) => payload)
  .on(createServerFx.doneData, (state, payload) => ({
    ...state,
    payload,
  }));

export const $serversLoading = getServersListFx.pending;
export const $serversEmpty = $servers.map((servers) => servers.length === 0);

sample({
  clock: pageMounted,
  target: getServersListFx,
});

sample({
  clock: deleteServerFx,
  target: getServersListFx,
});

export const events = {
  pageMounted,
};

export const effects = {
  getServersListFx,
  createServerFx,
  deleteServerFx,
  startServerFx,
};
