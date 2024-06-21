import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
export const SUCCESS_CODE = 10000;
export const AUTHERROT_CODE = 10005;
export const UNCONFIRMED_MSG = 'UNCONFIRMED';
interface IRequestOptions extends AxiosRequestConfig {
  showLoading?: boolean;
  ignoreAuth?: boolean;
  headers?: any;
}
export interface IResponseData {
  code: number;
  msg: string;
  data: any;
}
export interface IResponse<T = IResponseData> extends AxiosResponse {
  data: T;
}

const createAxios = ({
  baseURL,
  timeout = 3000,
}: {
  baseURL: string;
  timeout?: number;
}): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout,
  });
  instance.interceptors.request.use((config: any) => {
    if (!config.ignoreAuth) {
      // const token = localStorage.getItem('token');
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
    }
    return config;
  });
  instance.interceptors.response.use(
    (response: any) => {
      const { data } = response;
      if (data.code === AUTHERROT_CODE) {
        // localStorage.removeItem('token');
        // router.push('/login');
      }
      return data;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  return instance;
};

export default createAxios;
