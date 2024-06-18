export type SIGN_PARAMS = {
  password?: string;
  username?: string;
  confirmation_code?: string;
};
export type SIGNIN = {
  AuthenticationResult: {
    AccessToken: string;
    ExpiresIn: number;
    IdToken: string;
    RefreshToken: string;
    TokenType: 'Bearer';
  };
  ChallengeParameters: {};
};

export type ONBOARDING_PROGRESS = 'un_start';

export type CHANNEL_TYPE = 'dcs' | 'ccs' | 'scs';
export type CHANNEL_BASE = {
  channel_context: {
    channel_description: string;
    channel_type: CHANNEL_TYPE;
  } | null;
  channel_id: string;
  channel_name: string;
  user_channel_context?: {};
};
export type CHANNEL_LIST = Array<CHANNEL_BASE>;

export type CHANNEL_POPULAR_LIST = Array<
  CHANNEL_BASE & {
    channel_context: {
      channel_description: string;
      channel_type: CHANNEL_TYPE;
      channel_user_count: number;
      tag: any[];
    };
  }
>;

export type CHANNEL_GROUP_ITEM = {
  group_id: string;
  group_name: string;
  characters: string[];
  timestamp: number;
};

export type CHANNEL_GROUP_LIST = Array<CHANNEL_GROUP_ITEM>;

export type TARGETGROUP_PARAMS = {
  user_id: string;
  channel_id: string;
  group_id: string;
};

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
