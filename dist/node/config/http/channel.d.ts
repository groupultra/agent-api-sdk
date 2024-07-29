import { BASE_HTTP_RESPONSE } from './baseHttpResponse';
export type ONBOARDING_PROGRESS = 'un_start';
export type CHANNEL_TYPE = 'dcs' | 'ccs' | 'scs';
export type CHANNEL_BASE = {
    channel_context: {
        channel_description: string;
        channel_type: CHANNEL_TYPE;
    } | null;
    channel_id: string;
    channel_name: string;
    user_channel_context?: {
        [key: string]: string;
    };
};
export type CHANNEL_LIST = CHANNEL_BASE[];
export type CHANNEL_POPULAR_LIST = Array<CHANNEL_BASE & {
    channel_context: {
        channel_description: string;
        channel_type: CHANNEL_TYPE;
        channel_user_count: number;
        tag: string[];
    };
}>;
export type CURRENTUSERINFO = {
    context: {
        avatar: string;
        description: string;
        name: string;
    };
    email: string;
    email_verified: boolean;
    user_id: string;
    system_context: {
        onboarding: {
            progress: ONBOARDING_PROGRESS;
        };
    };
};
export type CHARACTER_ITEM = {
    character_id: string;
    character_context: CURRENTUSERINFO['context'];
};
export declare const create: (channel_name: string, channel_description: string) => BASE_HTTP_RESPONSE<{
    channel_name: string;
    context: {
        channel_description: string;
    };
}>;
export declare const update: (channel_id: string, channel_name: string) => BASE_HTTP_RESPONSE<{
    channel_id: string;
    channel_name: string;
}>;
export declare const popular: () => BASE_HTTP_RESPONSE;
export declare const list: () => BASE_HTTP_RESPONSE;
/** **********
 * [history]
 */
export declare const history_message: (params: {
    channel_id: string;
    before?: number;
    after?: number;
    limit: number;
}) => BASE_HTTP_RESPONSE<{
    channel_id: string;
    before?: number;
    after?: number;
    limit: number;
}>;
