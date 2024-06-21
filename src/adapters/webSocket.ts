import { mergeDeep } from '@/utils/index';
import { v4 } from 'uuid';

import type { MessageEvent, WsConfigBase } from '../config/ws.config';
import { Heartbeat as HeartbeatEvent } from '../config/ws.config';
const isWebSocketSupported = typeof WebSocket !== 'undefined';
type AutoReconnect = {
  /**
   *重连尝试次数 默认 3
   */
  reconnectMaxCount?: number;
};
type Heartbeat = {
  /**
   * 心跳间隔时间 默认 `3000` 毫秒
   */
  interval: number;
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

export default isWebSocketSupported &&
  class MSocket {
    public type: string = 'client';
    public url: string;

    public socket: WebSocket | null = null;

    public reconnectMaxCount: number = 3;

    public heartbeatTime: number = 6000;

    public socketCustomMessageEventList: MessageEvent;

    private requestCallbacks: Record<string, (response: any) => void> = {};

    public heartbeatTimer: ReturnType<typeof setInterval> | null = null;

    static isLoggedIn: boolean = false;

    static unloginMessageQueue: Array<any> = [];

    constructor(url: string, option: IWSOptions) {
      const mergeOption: IWSOptions = mergeDeep(
        {
          autoReconnect: {
            reconnectMaxCount: 3,
          },
          heartbeat: {
            interval: 10000,
          },
          query: {},
        },
        option,
      );
      console.log(mergeOption);
      this.url = this.formatUrl(
        url,
        mergeOption?.query as Record<string, string>,
      );
      this.reconnectMaxCount =
        mergeOption.autoReconnect?.reconnectMaxCount || 3;
      this.heartbeatTime = mergeOption.heartbeat?.interval || 3000;
      this.socketCustomMessageEventList = mergeOption?.onMessageEvent || {};
      this.connect();
    }

    public connect = () => {
      this.close();
      this.socket = new WebSocket(this.url);
      this.onError();
      this.onOpen();
      this.onMessage();
    };

    public onOpen() {
      if (this.socket) {
        this.socket!.onopen = () => {
          this.login();
          if (this.heartbeatTime) {
            this.startHeartbeat();
          }
        };
      }
    }

    public startHeartbeat(): void {
      const int = this.heartbeatTime;
      this.heartbeatTimer = setInterval(() => {
        this.send(HeartbeatEvent());
      }, int);
    }

    public login = async () => {
      try {
        // const store: Store = getStore()!;
        // const token = (await store.userlocalForage.getItem(
        //   'userToken',
        // )) as UserToken;
        // const loginType = (await store.userlocalForage.getItem('loginType')) as
        //   | 'cognito'
        //   | 'oauth2';
        // this.send(UserLogin(token.AccessToken, loginType) as WsConfigBase);
      } catch (error) {
        // WS.isLoggedIn = false;
      }
    };

    send(
      data: WsConfigBase,
      callback: (data: any) => any = () => {},
    ): Promise<void> {
      return new Promise((resolve, reject) => {
        if (!this.socket) {
          reject(new Error('socket is null'));
          return;
        }
        const trySend = () => {
          if (!this.socket) {
            reject(new Error('socket is null'));
            return;
          }
          // const isIgnoreLoginMessage = this.ignoreLoginMessage(data);
          // console.log(WS.isLoggedIn, isIgnoreLoginMessage)
          // if (!isIgnoreLoginMessage && !WS.isLoggedIn) {
          //   WS.unloginMessageQueue.push({
          //     data,
          //     callback,
          //   });
          //   return;
          // }
          if (this.socket!.readyState === this.socket!.OPEN) {
            try {
              // 发送消息前收集onMessage的对应回调函数
              this.requestCallbacks[data.request_id || v4()] = (response) => {
                callback(response);
                resolve(response);
              };
              this.socket!.send(JSON.stringify(data));
              resolve(); // 消息成功发送
            } catch (error) {
              reject(error); // 发送过程中出现错误
            }
          } else if (
            [this.socket!.CLOSING, this.socket!.CLOSED].includes(
              this.socket!.readyState,
            )
          ) {
            this.reconnect()
              .then(() => {
                setTimeout(trySend, 1000); // 重连成功后重试发送
              })
              .catch(reject); // 重连失败
          } else if (this.socket!.readyState === this.socket!.CONNECTING) {
            setTimeout(trySend, 1000); // 1秒后重试
          }
        };

        trySend();
      });
    }

    public close(): void {
      this.socket?.close();
      clearInterval(this.heartbeatTimer as ReturnType<typeof setInterval>);
      this.socket = null;
    }

    onMessage = () => {
      this.socket!.onmessage = async (event) => {
        try {
          const data = JSON.parse(event?.data);
          const { type, body } = data;
          const { request_id, status, origin_type, context } = body;
          // 分为两大类 copy是服务端针对requestid作出的响应
          if (type === 'copy') {
            if (request_id && this.requestCallbacks[request_id]) {
              if (!status) {
                // 失败
                console.error(`${origin_type} : ${context.message}`);

                if (
                  context.message.includes('access_token') ||
                  context.message.includes('login yet')
                ) {
                  // console.log(context.message);
                  // const store: Store = getStore()!;
                  // await store.user.fetchSignOut();
                  console.log('refresh token');
                }
              }
              if (origin_type === 'user_login') {
                // 修改登录状态处理未登录的时候发送事件
                // WS.isLoggedIn = status;
                this.processMessageQueue();
              }
              this.requestCallbacks[request_id](data);
              delete this.requestCallbacks[request_id];
            }
            return;
          }
          // 主动update的message不能使用对应的requestid
          if (this.socketCustomMessageEventList[type as keyof MessageEvent]) {
            this.socketCustomMessageEventList[type as keyof MessageEvent]!(
              data,
            );
          }
        } catch (error) {
          console.error(error);
        }
      };
    };

    public onError(): void {
      if (this.socket) {
        this.socket.onerror = (event) => {
          console.log('socket:error:event:', event);
        };
      }
    }

    processMessageQueue = () => {
      // while (WS.unloginMessageQueue.length > 0) {
      //   const { data, callback } = WS.unloginMessageQueue.shift();
      //   this.send(data, callback);
      // }
    };

    ignoreLoginMessage = (data: WsConfigBase) => {
      return data.type === 'user_login' || data.type === 'ping';
    };

    reconnect = () => {
      return new Promise((resolve, reject) => {
        this.connect();
        resolve({});
      });
    };

    public formatUrl(url: string, query: Record<string, string>): string {
      if (url && query) {
        const hasQuery = url?.includes('?');
        url += Object.keys(query).length
          ? `${hasQuery ? '&' : '?'}${Object.keys(query)
              .map((key) => `${key}=${query[key]}`)
              .join('&')}`
          : '';
      }
      return url;
    }
  };
