import { BASE_HTTP_RESPONSE } from './baseHttpResponse';

export type CHANNEL_GROUP_ITEM = {
  group_id: string;
  group_name: string;
  characters: string[];
  timestamp: number;
};

export type TARGETGROUP_PARAMS = {
  user_id: string;
  channel_id: string;
  group_id: string;
};

export type CHANNEL_GROUP_LIST = CHANNEL_GROUP_ITEM[];

export const getCurrentInfo = (): BASE_HTTP_RESPONSE => ({
  url: '/user/info',
  method: 'GET',
});

export const updateCurrentInfo = (params: {
  avatar?: string;
}): BASE_HTTP_RESPONSE<{ avatar?: string }> => ({
  url: '/user/info',
  method: 'POST',
  data: params,
});

/** **********
 * [whistle/ group]
 */

export const groupList = (
  channel_id: string,
): BASE_HTTP_RESPONSE<{ channel_id?: string }> => ({
  url: '/user/group/list',
  method: 'GET',
  data: {
    channel_id,
  },
});

export const groupUpdate = (
  data: {
    channel_id: string;
  } & Pick<CHANNEL_GROUP_ITEM, 'group_id' | 'characters' | 'group_name'>,
): BASE_HTTP_RESPONSE<
  {
    channel_id: string;
  } & Pick<CHANNEL_GROUP_ITEM, 'group_id' | 'characters' | 'group_name'>
> => ({
  url: '/user/group/update',
  method: 'POST',
  data,
});

export const groupCreate = (
  data: {
    channel_id: string;
  } & Pick<CHANNEL_GROUP_ITEM, 'characters' | 'group_name'>,
): BASE_HTTP_RESPONSE<
  {
    channel_id: string;
  } & Pick<CHANNEL_GROUP_ITEM, 'characters' | 'group_name'>
> => ({
  url: '/user/group/create',
  method: 'POST',
  data,
});

export const groupDel = (
  channel_id: string,
  group_id: string,
): BASE_HTTP_RESPONSE<{
  channel_id: string;
  group_id: string;
}> => ({
  url: '/user/group/delete',
  method: 'POST',
  data: {
    channel_id,
    group_id,
  },
});

/** **********
 * [temp]
 */
export const getGroupTemp = (
  channel_id: string,
): BASE_HTTP_RESPONSE<{
  channel_id: string;
}> => ({
  url: '/user/group/temp',
  method: 'GET',
  data: {
    channel_id,
  },
});

export const updateGrouptemp = (data: {
  channel_id: string;
  characters: CHANNEL_GROUP_ITEM['characters'];
}): BASE_HTTP_RESPONSE<{
  channel_id: string;
  characters: CHANNEL_GROUP_ITEM['characters'];
}> => ({
  url: '/user/group/temp',
  method: 'POST',
  data,
});

/** **********
 * [TargetGroup description]
 */

export const group = (
  data: TARGETGROUP_PARAMS,
): BASE_HTTP_RESPONSE<TARGETGROUP_PARAMS> => ({
  url: '/user/group',
  method: 'GET',
  data,
});
export const ServiceGroup = (
  group_id: string,
): BASE_HTTP_RESPONSE<{
  group_id: string;
}> => ({
  url: '/service/group',
  method: 'GET',
  data: {
    group_id,
  },
});

/** **********
 * [Character]
 */
export const characterFetchProfile = (
  character_list: string[],
): BASE_HTTP_RESPONSE<{
  character_list: string[];
}> => ({
  url: '/character/fetch_profile',
  method: 'GET',
  data: {
    character_list,
  },
});

export const getUserProfile = (
  character_list: string[],
): BASE_HTTP_RESPONSE<{
  character_list: string[];
}> => ({
  url: '/character/fetch_profile',
  method: 'POST',
  data: {
    character_list,
  },
});
