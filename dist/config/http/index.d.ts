import * as auth from './auth';
import * as channel from './channel';
import * as file from './file';
import * as user from './user';
export declare const httpConfig: {
    auth: typeof auth;
    channel: typeof channel;
    file: typeof file;
    user: typeof user;
};
export default httpConfig;
export type HttpConfig = typeof httpConfig;
