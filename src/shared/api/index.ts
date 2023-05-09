import {createEffect} from 'effector';

import {eel} from '~/shared/eel';

export interface Server {
  id: string;
  name: string;
  host: string;
  username: string;
  password: string;
}

export const getServersFx = createEffect<void, Server[]>(() => {
  // @ts-ignore
  return eel.get_servers()();
});

interface CreateServer {
  name: string;
  host: string;
  username: string;
  password: string;
}

export const createServerFx = createEffect<CreateServer, Server>(() => {
  // @ts-ignore
  return apiInstance.add_server(params)();
});

interface ServerData {
  id: string;
}

export const deleteServerFx = createEffect<ServerData, void>((data) => {
  return eel.del_server(data);
});

export const startServerFx = createEffect<ServerData, void>((data) => {
  return eel.start_server(data);
});
