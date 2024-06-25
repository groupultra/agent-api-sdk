type Heartbeat = {
  /**
   * 心跳间隔时间 默认 `3000` 毫秒
   */
  interval: number;
};
type AutoReconnect = {
  /**
   *重连尝试次数 默认 3
   */
  reconnectMaxCount?: number;
};
type MessageEvent = Record<string, (data: any) => void>;

export type WsConfigBase<T = Record<string, any>> = {
  type: string;
  request_id: string;
  user_id: string;
  access_token?: string;
  auth_origin?: 'cognito' | 'oauth';
  body?: T;
};
export interface IWSOptions {
  /**
   * 是否自动重连 默认`true`
   */
  autoReconnect?: AutoReconnect;
  /**
   * 心跳 默认 `false`
   */
  heartbeat?: Heartbeat;
  /**
   * url 携带的参数
   */
  query?: Record<string, string>;

  onMessageEvent: MessageEvent;
}
export const defaultWsOptions: IWSOptions = {
  autoReconnect: {
    reconnectMaxCount: 3,
  },
  heartbeat: {
    interval: 10000,
  },
  query: {},
  onMessageEvent: {},
};
