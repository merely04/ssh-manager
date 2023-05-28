import {createStore} from 'effector';

import * as api from '~/shared/api';

export const $servers = createStore<api.Server[]>([]);
export const $serversEmpty = $servers.map((servers) => servers.length === 0);
