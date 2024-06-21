import httpConfig from '@/config/http/index';
import createFetch from '@/utils/http';
import type MoobiusSDK from './Moobius';

type HTTPCONFIG = typeof httpConfig;
type TYPENAME = keyof HTTPCONFIG;
type ExtractConfig<T> = T extends (data: infer U) => infer R
  ? (data: U) => R
  : any;
type ITEMHTTPCONFIG = {
  [K in keyof HTTPCONFIG[TYPENAME]]: ExtractConfig<HTTPCONFIG[TYPENAME][K]>;
};
type ADDHTTPMETHOD = {
  [K in TYPENAME]: ITEMHTTPCONFIG;
};
type MoobiusSDKWithIndex = MoobiusSDK & ADDHTTPMETHOD;

export default function dispatchHttpRequest(this: MoobiusSDK) {
  const self = this as MoobiusSDKWithIndex;
  const fetch = createFetch({
    baseURL: this.config.url,
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
        const config = getConfig && (getConfig as any)(data);
        return fetch(config);
      };
      return acc;
    }, {} as ITEMHTTPCONFIG);
  });
}
