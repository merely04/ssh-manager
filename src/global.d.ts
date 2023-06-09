import {CreateServer, Message, SendServerCommand, Server, ServerData} from '~/shared/api';

export {};

declare global {
  interface Window {
    eel: {
      set_host(path: string): void;
      get_servers(): Server[];
      add_server(data: CreateServer): Server;
      del_server(data: ServerData): void;
      connect_server(data: SendServerCommand): Message;
      send_server_command(data: SendServerCommand): Message;
    };
  }
}
