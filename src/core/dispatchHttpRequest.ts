import type { USER_INFO } from '@/config/http/auth';
import httpConfig from '@/config/http/index';
import createFetch from '@/utils/http';
import storage from '@/utils/storage';
import type MoobiusSDK from './Moobius';
type HTTPCONFIG = typeof httpConfig;
type TYPENAME = keyof HTTPCONFIG;
type ExtractConfig<T> = T extends (data: infer U) => infer R
  ? (data: U) => R
  : never;
type ITEMHTTPCONFIG = {
  [K in keyof HTTPCONFIG[TYPENAME]]: ExtractConfig<HTTPCONFIG[TYPENAME][K]>;
};
type ADDHTTPMETHOD = {
  [K in TYPENAME]: ITEMHTTPCONFIG;
};
type MoobiusSDKWithIndex = MoobiusSDK & ADDHTTPMETHOD;

const LOGIN_METHODNAME = 'signIn';

export default function dispatchHttpRequest(this: MoobiusSDK) {
  const self = this as MoobiusSDKWithIndex;
  const fetch = createFetch({
    baseURL: this.config.httpUrl,
  });
  const _keys = Object.keys(httpConfig) as TYPENAME[];

  _keys.forEach((key: TYPENAME) => {
    const subKeys = Object.keys(httpConfig[key]) as Array<
      keyof HTTPCONFIG[TYPENAME]
    >;
    self[key] = subKeys.reduce((acc: any, methodName) => {
      const getConfig = httpConfig[key][methodName];
      acc[methodName as keyof HTTPCONFIG[TYPENAME]] = async (
        data: Parameters<typeof getConfig>[0],
      ) => {
        if (typeof getConfig !== 'function') {
          throw new Error('getConfig is not a function');
        }
        const config = getConfig && (getConfig as any)(data);
        const result = await fetch(config);
        console.log('methodName::::::', methodName, result.data);
        if (methodName === LOGIN_METHODNAME) {
          const { AccessToken, ExpiresIn, RefreshToken, TokenType } =
            result.data.AuthenticationResult;
          console.log('success login!!');
          storage.set<USER_INFO>(
            'userInfo',
            {
              AccessToken,
              ExpiresIn,
              RefreshToken,
              TokenType,
            },
            ExpiresIn * 1000,
          );
        }
        return result;
      };
      return acc;
    }, {} as ITEMHTTPCONFIG);
  });
}
