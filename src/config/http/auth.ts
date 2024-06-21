import { BASE_HTTP_RESPONSE } from './baseHttpResponse';
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
  ChallengeParameters: {
    [key: string]: string;
  };
};

export const SignUp = (
  params: SIGN_PARAMS,
): BASE_HTTP_RESPONSE<SIGN_PARAMS> => ({
  url: '/auth/sign_up',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});

export const SignIn = (
  params: SIGN_PARAMS,
): BASE_HTTP_RESPONSE<SIGN_PARAMS> => ({
  url: '/auth/sign_in',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});

export const SignOut = (params: {
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

export const Refresh = (params: {
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

export const ConfirmSignUp = (
  params: SIGN_PARAMS,
): BASE_HTTP_RESPONSE<SIGN_PARAMS> => ({
  url: '/auth/confirm_sign_up',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});

export const ResendConfirm = (
  params: SIGN_PARAMS,
): BASE_HTTP_RESPONSE<SIGN_PARAMS> => ({
  url: '/auth/resend_confirmation',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});

export const ConfirmResetPassword = (
  params: SIGN_PARAMS,
): BASE_HTTP_RESPONSE<SIGN_PARAMS> => ({
  url: '/auth/confirm_reset_password',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});

export const ForgotPassword = (
  params: SIGN_PARAMS,
): BASE_HTTP_RESPONSE<SIGN_PARAMS> => ({
  url: '/auth/forgot_password',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});
