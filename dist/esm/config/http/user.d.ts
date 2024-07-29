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
export declare const get_user_info: () => BASE_HTTP_RESPONSE;
export declare const post_user_info: (params: {
    avatar?: string;
}) => BASE_HTTP_RESPONSE<{
    avatar?: string;
}>;
/** **********
 * [whistle/ group]
 */
export declare const group_list: (channel_id: string) => BASE_HTTP_RESPONSE<{
    channel_id?: string | undefined;
}>;
export declare const group_update: (data: {
    channel_id: string;
} & Pick<CHANNEL_GROUP_ITEM, 'group_id' | 'characters' | 'group_name'>) => BASE_HTTP_RESPONSE<{
    channel_id: string;
} & Pick<CHANNEL_GROUP_ITEM, 'group_id' | 'characters' | 'group_name'>>;
export declare const group_create: (data: {
    channel_id: string;
} & Pick<CHANNEL_GROUP_ITEM, 'characters' | 'group_name'>) => BASE_HTTP_RESPONSE<{
    channel_id: string;
} & Pick<CHANNEL_GROUP_ITEM, 'characters' | 'group_name'>>;
export declare const group_delete: (channel_id: string, group_id: string) => BASE_HTTP_RESPONSE<{
    channel_id: string;
    group_id: string;
}>;
/** **********
 * [temp]
 */
export declare const get_group_temp: (channel_id: string) => BASE_HTTP_RESPONSE<{
    channel_id: string;
}>;
export declare const post_group_temp: (data: {
    channel_id: string;
    characters: CHANNEL_GROUP_ITEM['characters'];
}) => BASE_HTTP_RESPONSE<{
    channel_id: string;
    characters: CHANNEL_GROUP_ITEM['characters'];
}>;
/** **********
 * [TargetGroup description]
 */
export declare const get_group: (data: TARGETGROUP_PARAMS) => BASE_HTTP_RESPONSE<TARGETGROUP_PARAMS>;
export declare const get_service_group: (group_id: string) => BASE_HTTP_RESPONSE<{
    group_id: string;
}>;
/** **********
 * [Character]
 */
export declare const get_character_profile: (character_list: string[]) => BASE_HTTP_RESPONSE<{
    character_list: string[];
}>;
export declare const post_character_profile: (character_list: string[]) => BASE_HTTP_RESPONSE<{
    character_list: string[];
}>;
