import type { USER_INFO } from '@/config/http/auth';
import storage from '@/utils/storage';

import { v4 } from 'uuid';
type AUTH_ORIGIN = 'cognito' | 'oauth2';

export type WsConfigBase<T = Record<string, any>> = {
  type: string;
  request_id: string;
  user_id: string;
  access_token?: string;
  auth_origin?: 'cognito' | 'oauth';
  body?: T;
};
type ActionUpSubtype =
  | 'join_channel'
  | 'leave_channel'
  | 'fetch_characters'
  | 'fetch_buttons'
  | 'fetch_channel_info'
  | 'fetch_canvas'
  | 'fetch_style'
  | 'fetch_context_menu';
export type MsgUpType = 'text' | 'file' | 'audio' | 'image' | 'new_message';
interface MessageBody {
  channel_id: string;
  subtype: string;
  context: {
    [key: string]: any;
  };
}
type MessageRes<T = {}> = {
  type: keyof MessageEvent;
  body: MessageBody & T;
};

export type MessageDownData = MessageRes<{
  timestamp: number;
  message_id: string;
  content: any;
}>;
export type MessageEvent = {
  message_down?: (data: MessageDownData) => void;
  update?: (
    data: MessageRes<{
      userlist: string[];
      features: FEATUREITEM[];
    }>,
  ) => void;
  display?: (data: MessageRes<any>) => void;
};

export type MsgUpContext = 'text' | 'path';
export type WSBodyBase<Subtype = string, Content = null> = {
  subtype: Subtype;
  channel_id: string;
  timestamp: number;
  recipients?: string[];
  content?: Content;
  group_id?: string;
};
type FeatureCallArguments = {
  name: string;
  value: string | number;
};
export type Arguments = {
  name: string;
  type:
    | 'string'
    | 'number'
    | 'enum'
    | 'password'
    | 'invalid'
    | 'file'
    | 'image'
    | 'textbox';
  placeholder?: string;
  optional?: boolean;
  values?: string[];
};
export type FEATUREITEM = {
  button_id: string;
  button_name: string;
  button_text: string;
  new_window: boolean;
  arguments: Arguments[];
};

export const user_login = (
  access_token: string = '',
  loginType: AUTH_ORIGIN = 'cognito',
) => {
  return {
    type: 'user_login',
    request_id: v4(),
    access_token:
      storage.get<USER_INFO>('userInfo')?.AccessToken || access_token,
    auth_origin: loginType,
  };
};
export const message_up = ({
  type,
  value,
  recipients = '',
}: {
  type: MsgUpType;
  value:
    | string
    | {
        path: string;
        filename: string;
        size: number;
      };
  recipients: string;
}): WsConfigBase<{
  subtype: MsgUpType;
  content: any;
  channel_id: string;
  timestamp: number;
  recipients: string;
}> => {
  //   const store = getStore();
  return {
    type: 'message_up',
    request_id: v4(),
    user_id: storage.get<USER_INFO>('userInfo')?.userInfo?.user_id || '',
    body: {
      subtype: type,
      content:
        typeof value === 'string'
          ? {
              [type === 'text' ? 'text' : 'path']: value,
            }
          : value,
      channel_id: '',
      timestamp: Date.now(),
      recipients,
    },
  };
};

export const button_click = ({
  featureId,
  arguments: arg,
}: {
  featureId: string;
  arguments: FeatureCallArguments[];
}) => {
  //   const store = getStore();
  return {
    type: 'button_click',
    request_id: v4(),
    user_id: storage.get<USER_INFO>('userInfo')?.userInfo?.user_id || '',
    body: {
      button_id: featureId,
      channel_id: '',
      arguments: arg,
      context: {},
    },
  };
};

export const menu_click = ({
  item_id,
  message_id,
  message_subtype,
  message_content,
  arguments: arg,
}: {
  item_id: string;
  message_id: string;
  message_subtype: MsgUpType;
  message_content: {
    text: string;
  };
  arguments: FeatureCallArguments[];
}): WsConfigBase<any> => {
  //   const store = getStore();
  return {
    type: 'menu_click',
    request_id: v4(),
    user_id: storage.get<USER_INFO>('userInfo')?.userInfo?.user_id || '',
    body: {
      item_id,
      message_id,
      message_subtype,
      message_content,
      channel_id: '',
      context: {},
      arguments: arg || [],
    },
  };
};
export const action = ({
  type,
  channelId,
}: {
  type: ActionUpSubtype;
  channelId: string;
}): WsConfigBase<any> => {
  //   const store = getStore();
  return {
    type: 'action',
    request_id: v4(),
    user_id: storage.get<USER_INFO>('userInfo')?.userInfo?.user_id || '',
    body: {
      subtype: type,
      channel_id: channelId,
      context: {},
    },
  };
};
