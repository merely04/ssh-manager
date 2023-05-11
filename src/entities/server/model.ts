import {attach, createEvent, createStore, sample} from 'effector';

import * as api from '~/shared/api';
import {ServerData} from '~/shared/api';

export const getServersFx = attach({effect: api.getServersFx});

export const createServerFx = attach({effect: api.createServerFx});

const deleteServerFx = attach({effect: api.deleteServerFx});

const connectServerFx = attach({effect: api.connectServerFx});

export const pageMounted = createEvent();

export const connectServer = createEvent<ServerData>();

export const deleteServer = createEvent<ServerData>();

export const $servers = createStore<api.Server[]>([])
  .on(getServersFx.doneData, (_, payload) => payload)
  .on(createServerFx.doneData, (state, payload) => [...state, payload])
  .on(deleteServerFx.done, (state, payload) => state.filter((s) => s.id !== payload.params.id));

export const $serversLoading = getServersFx.pending;
export const $serversEmpty = $servers.map((servers) => servers.length === 0);

sample({
  clock: pageMounted,
  target: getServersFx,
});

sample({
  clock: connectServer,
  target: connectServerFx,
});

sample({
  clock: deleteServer,
  target: deleteServerFx,
});
