import { CHANNEL_GROUP_ITEM, TARGETGROUP_PARAMS } from './index.d';

export const Info = () => ({
  url: '/user/info',
  method: 'GET',
});

export const UpdateCurrentUserInfo = (params: { avatar?: string }) => ({
  url: '/user/info',
  method: 'POST',
  data: params,
});

/** **********
 * [whistle/ group]
 */

export const GroupList = async (channel_id: string) => ({
  url: '/user/group/list',
  method: 'GET',
  data: {
    channel_id,
  },
});

export const GroupUpdate = async (
  data: {
    channel_id: string;
  } & Pick<CHANNEL_GROUP_ITEM, 'group_id' | 'characters' | 'group_name'>,
) => ({
  url: '/user/group/update',
  method: 'POST',
  data,
});

export const GroupCreate = async (
  data: {
    channel_id: string;
  } & Pick<CHANNEL_GROUP_ITEM, 'characters' | 'group_name'>,
) => ({
  url: '/user/group/create',
  method: 'POST',
  data,
});

export const GroupDel = async (channel_id: string, group_id: string) => ({
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
export const GroupTemp = async (channel_id: string) => ({
  url: '/user/group/temp',
  method: 'GET',
  data: {
    channel_id,
  },
});

export const Grouptemp = async (data: {
  channel_id: string;
  characters: CHANNEL_GROUP_ITEM['characters'];
}) => ({
  url: '/user/group/temp',
  method: 'POST',
  data,
});

/** **********
 * [TargetGroup description]
 */

export const Group = async (data: TARGETGROUP_PARAMS) => ({
  url: '/user/group',
  method: 'GET',
  data,
});
export const ServiceGroup = async (group_id: string) => ({
  url: '/service/group',
  method: 'GET',
  data: {
    group_id,
  },
});

/** **********
 * [Character]
 */
export const CharacterFetchProfile = async (character_list: string[]) => ({
  url: '/character/fetch_profile',
  method: 'GET',
  data: {
    character_list,
  },
});

export const getUserProfile = (character_list: string[]) => ({
  url: '/character/fetch_profile',
  method: 'POST',
  data: {
    character_list,
  },
});
