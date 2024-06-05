import http from '@/lib/http'

import type { CURRENTUSERINFO } from './info'

export type CHANNEL_TYPE = 'dcs' | 'ccs' | 'scs'
export type CHANNEL_BASE = {
  channel_context: {
    channel_description: string
    channel_type: CHANNEL_TYPE
  } | null
  channel_id: string
  channel_name: string
  user_channel_context?: {}
}
export type CHANNEL_LIST = Array<CHANNEL_BASE>

export type CHANNEL_POPULAR_LIST = Array<
  CHANNEL_BASE & {
    channel_context: {
      channel_description: string
      channel_type: CHANNEL_TYPE
      channel_user_count: number
      tag: any[]
    }
  }
>

export type CHANNEL_GROUP_ITEM = {
  group_id: string
  group_name: string
  characters: string[]
  timestamp: number
}

export type CHANNEL_GROUP_LIST = Array<CHANNEL_GROUP_ITEM>

export type TARGETGROUP_PARAMS = {
  user_id: string
  channel_id: string
  group_id: string
}

export type CHARACTER_ITEM = {
  character_id: string
  character_context: CURRENTUSERINFO['context']
}

/** **********
 * [channel]
 */

export const RequestChannelCreate = async (
  channel_name: string,
  channel_description: string,
) => {
  return http.post<CHANNEL_BASE>('/channel/create', {
    channel_name,
    context: {
      channel_description,
    },
  })
}

export const RequestChannelUpdate = async (
  channel_id: string,
  channel_name: string,
  // context?: {
  //   channel_description: string
  // },
) => {
  const params = {
    channel_id,
    channel_name,
  }
  // context && (params.context = context)
  return http.post('/channel/update', params)
}

export const RequestChannelPopular = async () => {
  return http.get<CHANNEL_POPULAR_LIST>('/channel/popular')
}

export const RequestChannelList = async () => {
  return http.get<CHANNEL_LIST>('/channel/list')
}

/** **********
 * [whistle/ group]
 */

export const RequestGroupList = async (channel_id: string) => {
  return http.get<CHANNEL_GROUP_LIST>('/user/group/list', {
    channel_id,
  })
}

export const RequestGroupUpdate = async (
  data: {
    channel_id: string
  } & Pick<CHANNEL_GROUP_ITEM, 'group_id' | 'characters' | 'group_name'>,
) => {
  return http.post<Pick<CHANNEL_GROUP_ITEM, 'group_id' | 'group_name'>>(
    '/user/group/update',
    data,
  )
}

export const RequestGroupCreate = async (
  data: {
    channel_id: string
  } & Pick<CHANNEL_GROUP_ITEM, 'characters' | 'group_name'>,
) => {
  return http.post<Pick<CHANNEL_GROUP_ITEM, 'group_id' | 'group_name'>>(
    '/user/group/create',
    {
      ...data,
    },
  )
}

export const RequestGroupDel = async (channel_id: string, group_id: string) => {
  return http.post('/user/group/delete', {
    channel_id,
    group_id,
  })
}

/** **********
 * [RequestTargetGroup description]
 */

export const RequestTargetGroup = async (data: TARGETGROUP_PARAMS) => {
  return http.get<Pick<CHANNEL_GROUP_ITEM, 'group_name' | 'characters'>>(
    '/user/group',
    {
      ...data,
    },
  )
}
export const RequestServiceGroup = async (group_id: string) => {
  return http.get('/service/group', {
    group_id,
  })
}
/** **********
 * [Character]
 */
export const RequestCharacterProfiles = async (character_list: string[]) => {
  return http.get<Array<CHARACTER_ITEM>>('/character/fetch_profile', {
    character_list,
  })
}

/** **********
 * [temp]
 */
export const RequestGetGrouptemp = async (channel_id: string) => {
  return http.get<Array<string>>('/user/group/temp', {
    channel_id,
  })
}

export const RequestGrouptemp = async (data: {
  channel_id: string
  characters: CHANNEL_GROUP_ITEM['characters']
}) => {
  return http.post('/user/group/temp', {
    ...data,
  })
}

/** **********
 * [history]
 */

export const RequestMsgHistory = async (params: {
  channel_id: string
  before?: number // 时间戳 s
  after?: number // 时间戳 s
  limit: number
}) => {
  params.before === 0
    ? delete params.before
    : (params.before = params.before! / 1000)
  params.after === 0
    ? delete params.after
    : (params.after = params.after! / 1000)
  return http.get('/channel/history_message', params)
}
