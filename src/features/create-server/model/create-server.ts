import {createEvent, sample} from 'effector';

import {serverModel} from '../../../entities/server';
import {localApi} from '../../../shared/api';

const createServer = createEvent<localApi.servers.CreateServerParams>();

sample({
  clock: createServer,
  target: serverModel.effects.createServerFx,
});

export const events = {
  createServer,
};
