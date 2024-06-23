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

export type CHANNEL_POPULAR_LIST = Array<
  CHANNEL_BASE & {
    channel_context: {
      channel_description: string;
      channel_type: CHANNEL_TYPE;
      channel_user_count: number;
      tag: string[];
    };
  }
>;
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
export const create = (
  channel_name: string,
  channel_description: string,
): BASE_HTTP_RESPONSE<{
  channel_name: string;
  context: {
    channel_description: string;
  };
}> => ({
  url: '/channel/create',
  method: 'POST',
  data: {
    channel_name,
    context: {
      channel_description,
    },
  },
});

export const update = (
  channel_id: string,
  channel_name: string,
): BASE_HTTP_RESPONSE<{
  channel_id: string;
  channel_name: string;
}> => ({
  url: '/channel/update',
  method: 'POST',
  data: {
    channel_id,
    channel_name,
  },
});

export const popular = (): BASE_HTTP_RESPONSE => ({
  url: '/channel/popular',
  method: 'GET',
});

export const list = (): BASE_HTTP_RESPONSE => ({
  url: '/channel/list',
  method: 'GET',
});

/** **********
 * [history]
 */

export const historyMessage = (params: {
  channel_id: string;
  before?: number; // 时间戳 s
  after?: number; // 时间戳 s
  limit: number;
}): BASE_HTTP_RESPONSE<{
  channel_id: string;
  before?: number; // 时间戳 s
  after?: number; // 时间戳 s
  limit: number;
}> => {
  params.before === 0
    ? delete params.before
    : (params.before = params.before! / 1000);
  params.after === 0
    ? delete params.after
    : (params.after = params.after! / 1000);
  return {
    url: '/channel/history_message',
    method: 'GET',
    data: params,
  };
};
