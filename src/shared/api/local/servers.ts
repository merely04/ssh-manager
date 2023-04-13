import {apiInstance} from './base';
import {Server} from './models';

export const getServersList = async (): Promise<Server[]> => {
  // @ts-ignore
  return apiInstance.get_servers()();
};

export type CreateServerParams = {
  name: string;
  host: string;
  username: string;
  password: string;
}

export const createServer = async (params: CreateServerParams): Promise<Server> => {
  // @ts-ignore
  return apiInstance.add_server(params)();
};

export type DeleteServerParams = {
  id: string;
}

export const deleteServer = (params: DeleteServerParams) => {
  return apiInstance.del_server(params);
};

export type StartServerParams = {
  id: string;
}

export const startServer = (params: StartServerParams) => {
  return apiInstance.start_server(params);
};