import type MoobiusBASIC from '@/core/baseMoobius';
import storage from '@/utils/storage';
import { BASE_HTTP_RESPONSE } from './baseHttpResponse';
import type { CURRENTUSERINFO } from './channel';
import { get_user_info } from './user';

export type SIGN_PARAMS = {
  password?: string;
  username?: string;
  confirmation_code?: string;
};

export type USER_INFO = {
  AccessToken: string;
  ExpiresIn: number;
  RefreshToken: string;
  TokenType: 'Bearer';
  userInfo: {
    user_id: string;
    system_context: {
      onboarding: {
        progress: 'un_start';
      };
    };
    email: string;
    context: CURRENTUSERINFO['context'];
  } | null;
};

export const sign_up = (
  params: SIGN_PARAMS,
): BASE_HTTP_RESPONSE<SIGN_PARAMS> => ({
  url: '/auth/sign_up',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});

export const sign_in = (
  params: SIGN_PARAMS,
): BASE_HTTP_RESPONSE<SIGN_PARAMS> => ({
  url: '/auth/sign_in',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
  callback: async function (this: MoobiusBASIC, result) {
    const { AccessToken, ExpiresIn, RefreshToken, TokenType } =
      result.data.AuthenticationResult;
    storage.set<USER_INFO>(
      'userInfo',
      {
        AccessToken,
        ExpiresIn,
        RefreshToken,
        TokenType,
        userInfo: null,
      },
      ExpiresIn * 1000,
    );
    const userInfo = await this.fetch(get_user_info());
    storage.set<USER_INFO>(
      'userInfo',
      {
        AccessToken,
        ExpiresIn,
        RefreshToken,
        TokenType,
        userInfo: userInfo?.data || null,
      },
      ExpiresIn * 1000,
    );
    await this?.send('user_login');
  },
});

export const sign_out = () => {
  const userInfo = storage.get<USER_INFO>('userInfo');
  const access_token = userInfo?.AccessToken;
  storage.remove('userInfo');
  return {
    url: '/auth/sign_out',
    method: 'POST',
    data: {
      access_token,
    },
    config: {
      ignoreAuth: true,
    },
  };
};

export const refresh = () => {
  const userInfo = storage.get<USER_INFO>('userInfo');
  const refresh_token = userInfo?.RefreshToken;
  const username = userInfo?.userInfo?.email;
  return {
    url: '/auth/refresh',
    method: 'POST',
    data: {
      refresh_token,
      username,
    },
    config: {
      ignoreAuth: true,
    },
  };
};

export const resend_confirmation = (
  params: SIGN_PARAMS,
): BASE_HTTP_RESPONSE<SIGN_PARAMS> => ({
  url: '/auth/resend_confirmation',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});

export const confirm_reset_password = (
  params: SIGN_PARAMS,
): BASE_HTTP_RESPONSE<SIGN_PARAMS> => ({
  url: '/auth/confirm_reset_password',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});

export const forgot_password = (
  params: SIGN_PARAMS,
): BASE_HTTP_RESPONSE<SIGN_PARAMS> => ({
  url: '/auth/forgot_password',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});
