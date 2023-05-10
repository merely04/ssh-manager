import {createEvent, sample} from 'effector';

import {serverModel} from '~/entities/server';

import {ServerData} from '~/shared/api';

export const submit = createEvent<ServerData>();

sample({
  clock: submit,
  target: serverModel.connectServer,
});
