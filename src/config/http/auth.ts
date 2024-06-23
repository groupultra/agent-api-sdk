import { BASE_HTTP_RESPONSE } from './baseHttpResponse';
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
};

export const signUp = (
  params: SIGN_PARAMS,
): BASE_HTTP_RESPONSE<SIGN_PARAMS> => ({
  url: '/auth/sign_up',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});

export const signIn = (
  params: SIGN_PARAMS,
): BASE_HTTP_RESPONSE<SIGN_PARAMS> => ({
  url: '/auth/sign_in',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});

export const signOut = (params: {
  access_token: string;
}): BASE_HTTP_RESPONSE<{
  access_token: string;
}> => ({
  url: '/auth/sign_out',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});

export const refresh = (params: {
  refresh_token: string;
  username: string;
}): BASE_HTTP_RESPONSE<{
  refresh_token: string;
  username: string;
}> => ({
  url: '/auth/refresh',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});

export const confirmSignUp = (
  params: SIGN_PARAMS,
): BASE_HTTP_RESPONSE<SIGN_PARAMS> => ({
  url: '/auth/confirm_sign_up',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});

export const resendConfirm = (
  params: SIGN_PARAMS,
): BASE_HTTP_RESPONSE<SIGN_PARAMS> => ({
  url: '/auth/resend_confirmation',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});

export const confirmResetPassword = (
  params: SIGN_PARAMS,
): BASE_HTTP_RESPONSE<SIGN_PARAMS> => ({
  url: '/auth/confirm_reset_password',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});

export const forgotPassword = (
  params: SIGN_PARAMS,
): BASE_HTTP_RESPONSE<SIGN_PARAMS> => ({
  url: '/auth/forgot_password',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});
