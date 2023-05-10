import {createEvent, sample} from 'effector';

import {serverModel} from '~/entities/server';

import {CreateServer} from '~/shared/api';

export const submit = createEvent<CreateServer>();

sample({
  clock: submit,
  target: serverModel.createServer,
});
