import {createEvent, createStore, sample} from 'effector';
import {attach} from 'effector/compat';

import * as api from '~/shared/api';
import {Command, SendServerCommand} from '~/shared/api';

export const pageMounted = createEvent();

export const connectServerFx = attach({effect: api.connectServerFx});

export const sendServerCommandFx = attach({effect: api.sendServerCommandFx});

export const sendServerCommand = createEvent<SendServerCommand>();

export const $connection = createStore<Command[]>([])
  .on(connectServerFx.doneData, (_, payload) => [payload])
  .on(sendServerCommandFx.doneData, (state, payload) => [...state, payload]);

export const $connectionPending = connectServerFx.pending;

sample({
  clock: sendServerCommand,
  target: sendServerCommandFx,
});
