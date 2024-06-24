import type { USER_INFO } from '@/config/http/auth';
import storage from '@/utils/storage';

import { v4 } from 'uuid';
type AUTH_ORIGIN = 'cognito' | 'oauth2';

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
