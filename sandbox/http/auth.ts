import http from '@/lib/http'

export type SIGN_PARAMS = {
  password?: string
  username?: string
  confirmation_code?: string
}
export type SIGNIN = {
  AuthenticationResult: {
    AccessToken: string
    ExpiresIn: number
    IdToken: string
    RefreshToken: string
    TokenType: 'Bearer'
  }
  ChallengeParameters: {}
}

export const RequestSignUp = async (params: SIGN_PARAMS) => {
  return http.post('/auth/sign_up', params, {
    ignoreAuth: true,
  })
}

export const RequestSignIn = async (params: SIGN_PARAMS) => {
  return http.post<SIGNIN>('/auth/sign_in', params, {
    ignoreAuth: true,
  })
}

export const RequestSignOut = async (params: {access_token: string}) => {
  return http.post('/auth/sign_out', params, {
    ignoreAuth: true,
  })
}

export const RequestRefreshToken = async (params: {
  refresh_token: string
  username: string
}) => {
  return http.post('/auth/refresh', params, {
    ignoreAuth: true,
  })
}

export const RequestConfirmSignUp = async (params: SIGN_PARAMS) => {
  return http.post('/auth/confirm_sign_up', params, {
    ignoreAuth: true,
  })
}

export const RequestResendConfirmation = async (params: SIGN_PARAMS) => {
  return http.post('/auth/resend_confirmation', params, {
    ignoreAuth: true,
  })
}

export const RequestConfirmForgotPassword = async (params: SIGN_PARAMS) => {
  return http.post('/auth/confirm_reset_password', params, {
    ignoreAuth: true,
  })
}

export const RequestForgotPassword = async (params: SIGN_PARAMS) => {
  return http.post('/auth/forgot_password', params, {
    ignoreAuth: true,
  })
}
