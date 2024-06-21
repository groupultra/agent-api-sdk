import * as auth from './auth';
import * as channel from './channel';
import * as file from './file';
import * as user from './user';

export const httpConfig = {
  auth,
  channel,
  file,
  user,
};

export default httpConfig;
export type HttpConfig = typeof httpConfig;
