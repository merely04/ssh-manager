import {attach, createEvent, sample} from 'effector';

import {serverModel} from '~/entities/server';

import * as api from '~/shared/api';

const deleteServerFx = attach({effect: api.deleteServerFx});
export const $loading = deleteServerFx.pending;

serverModel.$servers.on(deleteServerFx.done, (state, payload) =>
  state.filter((s) => s.id !== payload.params.id),
);

export const deleteButtonClick = createEvent<string>();

sample({
  clock: deleteButtonClick,
  fn: (id) => ({id}),
  target: deleteServerFx,
});
