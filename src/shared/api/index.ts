import {createEffect} from 'effector';

import {eel} from '~/shared/eel';

export interface Server {
  id: string;
  name: string;
  host: string;
  username: string;
  password: string;
}

export interface ServerData {
  id: string;
}

export interface Command {
  user: string;
  server: string;
}

export const getServersFx = createEffect<void, Server[]>(() => {
  // @ts-ignore
  return eel.get_servers()();
});

export interface CreateServer {
  name: string;
  host: string;
  username: string;
  password: string;
}

export const createServerFx = createEffect<CreateServer, Server>((data) => {
  // @ts-ignore
  return eel.add_server(data)();
});

export const deleteServerFx = createEffect<ServerData, void>((data) => {
  return eel.del_server(data);
});

export const connectServerFx = createEffect<ServerData, Command>((data) => {
  console.log('connectServerFx');
  // @ts-ignore
  return eel.connect_server({id: data.id, command: 'uptime'})();
});

export interface SendServerCommand extends ServerData {
  command: string;
}

export const sendServerCommandFx = createEffect<SendServerCommand, Command>((data) => {
  // @ts-ignore
  return eel.send_server_command(data)();
});
