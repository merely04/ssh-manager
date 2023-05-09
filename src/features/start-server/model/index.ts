import {createEvent, sample} from 'effector';

import {serverModel} from '../../../entities/server';
import {localApi} from '../../../shared/api';

const startServer = createEvent<localApi.servers.StartServerParams>();

sample({
  clock: startServer,
  target: serverModel.effects.startServerFx,
});

export const events = {
  startServer,
};
