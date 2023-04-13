import {Server} from './shared/api/local';
import {CreateServerParams, DeleteServerParams, StartServerParams} from './shared/api/local/servers';

export {};

declare global {
  interface Window {
    eel: {
      set_host(path: string): void,
      get_servers(): Server[],
      add_server(params: CreateServerParams): Server,
      del_server(params: DeleteServerParams): void,
      start_server(params: StartServerParams): void,
    };
  }
}