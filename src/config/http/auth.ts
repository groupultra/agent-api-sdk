import { SIGN_PARAMS } from './index.d';
export const SignUp = (params: SIGN_PARAMS) => ({
  url: '/auth/sign_up',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});

export const SignIn = (params: SIGN_PARAMS) => ({
  url: '/auth/sign_in',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});

export const SignOut = (params: { access_token: string }) => ({
  url: '/auth/sign_out',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});

export const Refresh = async (params: {
  refresh_token: string;
  username: string;
}) => ({
  url: '/auth/refresh',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});

export const ConfirmSignUp = async (params: SIGN_PARAMS) => ({
  url: '/auth/confirm_sign_up',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});

export const ResendConfirm = async (params: SIGN_PARAMS) => ({
  url: '/auth/resend_confirmation',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});

export const ConfirmResetPassword = async (params: SIGN_PARAMS) => ({
  url: '/auth/confirm_reset_password',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});

export const ForgotPassword = async (params: SIGN_PARAMS) => ({
  url: '/auth/forgot_password',
  method: 'POST',
  data: params,
  config: {
    ignoreAuth: true,
  },
});
