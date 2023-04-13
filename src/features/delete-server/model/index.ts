import {createEvent, sample} from 'effector';
import {serverModel} from '../../../entities/server';
import {localApi} from '../../../shared/api';

const deleteServer = createEvent<localApi.servers.DeleteServerParams>();

sample({
  clock: deleteServer,
  target: serverModel.effects.deleteServerFx,
});

export const events = {
  deleteServer,
};