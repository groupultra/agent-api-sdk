import type { AxiosInstance } from 'axios';
export declare const SUCCESS_CODE = 10000;
export declare const AUTHERROT_CODE = 10005;
export declare const UNCONFIRMED_MSG = "UNCONFIRMED";
declare const createAxios: ({ baseURL, timeout, }: {
    baseURL: string;
    timeout?: number | undefined;
}) => AxiosInstance;
export default createAxios;
