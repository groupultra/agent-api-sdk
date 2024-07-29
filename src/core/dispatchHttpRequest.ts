import httpConfig from '@/config/http/index';
import type MoobiusBASIC from '@/core/baseMoobius';
import createFetch from '@/utils/http';
type HTTPCONFIG = typeof httpConfig;
type TYPENAME = keyof HTTPCONFIG;
type ExtractConfig<T> = T extends (data: infer U) => infer R
  ? (data: U) => R
  : never;
type ITEMHTTPCONFIG = {
  [K in keyof HTTPCONFIG[TYPENAME]]: ExtractConfig<HTTPCONFIG[TYPENAME][K]>;
};

export default function dispatchHttpRequest(this: MoobiusBASIC) {
  this.fetch = createFetch({
    baseURL: this.config.httpUrl,
  });
  const _keys = Object.keys(httpConfig) as TYPENAME[];

  _keys.forEach((key: TYPENAME) => {
    const subKeys = Object.keys(httpConfig[key]) as Array<
      keyof HTTPCONFIG[TYPENAME]
    >;
    this[key] = subKeys.reduce((acc: any, methodName) => {
      const getConfig = httpConfig[key][methodName];
      acc[methodName as keyof HTTPCONFIG[TYPENAME]] = async (
        data: Parameters<typeof getConfig>[0],
      ) => {
        if (typeof getConfig !== 'function') {
          throw new Error('getConfig is not a function');
        }
        const config: any = getConfig && (getConfig as any)(data);
        console.log(config);
        const nextMethod = config?.callback;
        delete config.callback;
        const result = await this.fetch(config);
        if (nextMethod) {
          await nextMethod.call(this, result);
        }
        return result;
      };
      return acc;
    }, {} as ITEMHTTPCONFIG);
  });
}
