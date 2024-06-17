import { CHANNEL_GROUP_ITEM, TARGETGROUP_PARAMS } from './index.d';

export const RequestChannelCreate = (
  channel_name: string,
  channel_description: string,
) => ({
  url: '/channel/create',
  method: 'POST',
  data: {
    channel_name,
    context: {
      channel_description,
    },
  },
});

export const RequestChannelUpdate = (
  channel_id: string,
  channel_name: string,
) => ({
  url: '/channel/update',
  method: 'POST',
  data: {
    channel_id,
    channel_name,
  },
});

export const RequestChannelPopular = () => ({
  url: '/channel/popular',
  method: 'GET',
});

export const RequestChannelList = () => ({
  url: '/channel/list',
  method: 'GET',
});

/** **********
 * [whistle/ group]
 */

export const RequestGroupList = async (channel_id: string) => ({
  url: '/user/group/list',
  method: 'GET',
  data: {
    channel_id,
  },
});

export const RequestGroupUpdate = async (
  data: {
    channel_id: string;
  } & Pick<CHANNEL_GROUP_ITEM, 'group_id' | 'characters' | 'group_name'>,
) => ({
  url: '/user/group/update',
  method: 'POST',
  data,
});

export const RequestGroupCreate = async (
  data: {
    channel_id: string;
  } & Pick<CHANNEL_GROUP_ITEM, 'characters' | 'group_name'>,
) => ({
  url: '/user/group/create',
  method: 'POST',
  data,
});

export const RequestGroupDel = async (
  channel_id: string,
  group_id: string,
) => ({
  url: '/user/group/delete',
  method: 'POST',
  data: {
    channel_id,
    group_id,
  },
});

/** **********
 * [RequestTargetGroup description]
 */

export const RequestTargetGroup = async (data: TARGETGROUP_PARAMS) => ({
  url: '/user/group',
  method: 'GET',
  data,
});
export const RequestServiceGroup = async (group_id: string) => ({
  url: '/service/group',
  method: 'GET',
  data: {
    group_id,
  },
});
/** **********
 * [Character]
 */
export const RequestCharacterProfiles = async (character_list: string[]) => ({
  url: '/character/fetch_profile',
  method: 'GET',
  data: {
    character_list,
  },
});

/** **********
 * [temp]
 */
export const RequestGetGrouptemp = async (channel_id: string) => ({
  url: '/user/group/temp',
  method: 'GET',
  data: {
    channel_id,
  },
});

export const RequestGrouptemp = async (data: {
  channel_id: string;
  characters: CHANNEL_GROUP_ITEM['characters'];
}) => ({
  url: '/user/group/temp',
  method: 'POST',
  data,
});

/** **********
 * [history]
 */

export const RequestMsgHistory = async (params: {
  channel_id: string;
  before?: number; // 时间戳 s
  after?: number; // 时间戳 s
  limit: number;
}) => {
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
