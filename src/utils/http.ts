import type { USER_INFO } from '@/config/http/auth';
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import storage from './storage';
export const SUCCESS_CODE = 10000;
export const AUTHERROT_CODE = 10005;
export const UNCONFIRMED_MSG = 'UNCONFIRMED';

const createAxios = ({
  baseURL,
  timeout = 100000,
}: {
  baseURL: string;
  timeout?: number;
}): AxiosInstance => {
  const instance: AxiosInstance = axios.create({
    baseURL,
    timeout,
  });
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const internalConfig = config as InternalAxiosRequestConfig & {
      config?: {
        ignoreAuth?: boolean;
      };
    };
    if (!(internalConfig.config && internalConfig.config.ignoreAuth)) {
      const userInfo = storage.get<USER_INFO>('userInfo');
      console.log('userInfo:::', userInfo);
      if (!userInfo) {
        // 获取不到用户信息 可能未登录 可能token过期
        return Promise.reject(
          new Error(`You do not have permission to request ${config.url}`),
        );
      }
      if (userInfo?.AccessToken) {
        internalConfig.headers['Auth-Origin'] = 'cognito';
        internalConfig.headers.Authorization = `${userInfo?.TokenType} ${userInfo?.AccessToken}`;
      }
      delete internalConfig.config;
    }
    return internalConfig;
  });
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      const { data } = response;
      if (data.code === SUCCESS_CODE) {
        return data;
      }
      if (data.code === AUTHERROT_CODE) {
        // 重新登录
        return Promise.reject(new Error(UNCONFIRMED_MSG));
      }
      return Promise.reject(new Error(data.msg));
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  return instance;
};

export default createAxios;
