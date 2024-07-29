import { BASE_HTTP_RESPONSE } from './baseHttpResponse';
import type { CURRENTUSERINFO } from './channel';
export type SIGN_PARAMS = {
    password?: string;
    username?: string;
    confirmation_code?: string;
};
export type USER_INFO = {
    AccessToken: string;
    ExpiresIn: number;
    RefreshToken: string;
    TokenType: 'Bearer';
    userInfo: {
        user_id: string;
        system_context: {
            onboarding: {
                progress: 'un_start';
            };
        };
        email: string;
        context: CURRENTUSERINFO['context'];
    } | null;
};
export declare const sign_up: (params: SIGN_PARAMS) => BASE_HTTP_RESPONSE<SIGN_PARAMS>;
export declare const sign_in: (params: SIGN_PARAMS) => BASE_HTTP_RESPONSE<SIGN_PARAMS>;
export declare const sign_out: (params: {
    access_token: string;
}) => BASE_HTTP_RESPONSE<{
    access_token: string;
}>;
export declare const refresh: (params: {
    refresh_token: string;
    username: string;
}) => BASE_HTTP_RESPONSE<{
    refresh_token: string;
    username: string;
}>;
export declare const confirm_sign_up: (params: SIGN_PARAMS) => BASE_HTTP_RESPONSE<SIGN_PARAMS>;
export declare const resend_confirmation: (params: SIGN_PARAMS) => BASE_HTTP_RESPONSE<SIGN_PARAMS>;
export declare const confirm_reset_password: (params: SIGN_PARAMS) => BASE_HTTP_RESPONSE<SIGN_PARAMS>;
export declare const forgot_password: (params: SIGN_PARAMS) => BASE_HTTP_RESPONSE<SIGN_PARAMS>;
