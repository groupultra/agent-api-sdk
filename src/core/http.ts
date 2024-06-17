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

class Axios {
  private instance: AxiosInstance;

  private isRefreshing = false;

  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor() {
    this.instance = axios.create({
      timeout: 25000,
      // withCredentials: true,
      baseURL:
        process.env.NODE_ENV === 'development'
          ? process.env.NEXT_PUBLIC_API_BASEURL
          : process.env.NEXT_PUBLIC_API_PRODUCTION_BASEURL,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      this.handleSuccessRequeset as any,
      this.handleErrorRequeset,
    );
    this.instance.interceptors.response.use(
      this.handleSuccessResponse as any,
      this.handleErrorResponse,
    );
  }

  private async handleSuccessRequeset(config: IRequestOptions) {
    const { ignoreAuth = false } = config;
    if (!ignoreAuth) {
      // const userInfo = (await store.userlocalForage.getItem(
      //   'userToken',
      // )) as UserToken;
      // config.headers.Authorization =
      //   `${userInfo?.TokenType} ${userInfo?.AccessToken}` || ``;
      // config.headers['Auth-Origin'] =
      //   await store.userlocalForage.getItem('loginType');
    }
    return config;
  }

  private handleErrorRequeset = (error: any) => {
    return Promise.reject(error);
  };

  private handleSuccessResponse = (response: AxiosResponse) => {
    const originalRequest = response.config;
    // 成功请求
    if (
      response?.data?.code === SUCCESS_CODE ||
      /success/i.test(response?.data?.msg) ||
      response.status === 304 ||
      response.status === 204 ||
      (response.config.responseType === 'arraybuffer' &&
        response.status === 200)
    ) {
      return Promise.resolve(response.data);
    }
    if (
      response?.data?.code === AUTHERROT_CODE &&
      !(response.config as IRequestOptions)?.ignoreAuth
    ) {
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        // 发起请求刷新token
        return this.refreshToken()
          .then((userInfo) => {
            this.isRefreshing = false;
            this.onRefreshed(userInfo?.AccessToken);
            // 更新token并重新发送之前被拦截的请求
            originalRequest.headers.Authorization = `Bearer ${userInfo?.AccessToken}`;
            return this.instance(originalRequest);
          })
          .catch((refreshError) => {
            this.isRefreshing = false;
            return Promise.reject(refreshError);
          });
      }
      return new Promise((resolve) => {
        this.subscribeTokenRefresh((newAccessToken) => {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          resolve(this.instance(originalRequest));
        });
      });
    }
    console.error(`
      ${response.config.url!} : 
      ${response?.data?.message || response?.data?.data || '请求失败'}
    `);
    return Promise.reject(response);
  };

  private handleErrorResponse = (error: any) => {
    if (error.code === 'ECONNABORTED') {
      console.error(
        `
        ${error.config.url!} : 
        ${error.message}
      `,
        {
          onClose: () => {
            console.log('resend');
          },
        },
      );
    } else {
      console.error(
        `
        ${error.config.url!} : 
        ${error.message}
      `,
      );
    }
    return Promise.reject(error);
  };

  private refreshToken(): Promise<any> {
    // const store: Store = getStore()!;
    // // 发起请求刷新token
    // return store.user.fetchRefresh();
    return new Promise(() => {
      console.log('refresh token');
    });
  }

  private subscribeTokenRefresh(callback: (token: string) => void) {
    this.refreshSubscribers.push(callback);
  }

  private onRefreshed(newAccessToken: string) {
    this.refreshSubscribers.map((callback) => callback(newAccessToken));
  }

  public async get<T = any>(
    url: string,
    params?: any,
    options?: IRequestOptions,
  ): Promise<IResponse<T>> {
    return this.instance.get(url, {
      params,
      ...options,
    });
  }

  public async post<T = any>(
    url: string,
    data?: any,
    options?: IRequestOptions,
  ): Promise<IResponse<T>> {
    return this.instance.post(url, data, options);
  }
}

export default new Axios();
