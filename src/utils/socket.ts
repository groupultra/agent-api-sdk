import { formatUrl, isNodeEnv, mergeDeep } from '@/utils/index';
import { v4 } from 'uuid';
import type { WsConfigBase } from './socket.type';

import type { IWSOptions } from './socket.type';
import { defaultWsOptions } from './socket.type';

const isWebSocketSupported = typeof WebSocket !== 'undefined';
export class MSocket {
  public type: string = 'client';
  public url: string = '';
  public _socket: WebSocket | null = null;
  public reconnectMaxCount: number = 3;
  public heartbeatTime: number = 6000;
  private requestCallBackTimeout: number = 100000;
  private requestCallbacks: Record<string, (response: any) => void> = {};
  public heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  constructor(url: string, option: IWSOptions) {
    const mergeOption: IWSOptions = mergeDeep(defaultWsOptions, option);
    this.url = formatUrl(url, mergeOption?.query as Record<string, string>);
    this.reconnectMaxCount = mergeOption.autoReconnect?.reconnectMaxCount || 3;
    this.heartbeatTime = mergeOption.heartbeat?.interval || 3000;
    this.connect();
  }
  connect = async () => {
    this.close();
    this._socket = await this.createSocket();
    if (this._socket) {
      this.open();
      this.onMessage();
    }
    this.error();
  };
  public open(): void {
    this._socket!.onopen = () => {
      console.log('onopen');
      this.heartbeat();
    };
  }
  reconnect = async () => {
    await this.connect();
  };

  send(data: WsConfigBase): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this._socket) {
        reject(new Error('socket is null'));
        return;
      }
      const requestId = data.request_id || v4();
      let timeoutHandle: ReturnType<typeof setTimeout> | null | NodeJS.Timeout =
        null;
      const trySend = () => {
        if (!this._socket) {
          reject(new Error('socket is null'));
          return;
        }
        if (this._socket!.readyState === this._socket!.OPEN) {
          try {
            console.log(
              'send:',
              this.requestCallbacks,
              requestId,
              this.requestCallbacks,
            );
            this.requestCallbacks[requestId] = (response) => {
              clearTimeout(timeoutHandle as ReturnType<typeof setTimeout>);
              resolve(response);
            };
            this._socket!.send(JSON.stringify(data));
            timeoutHandle = setTimeout(() => {
              delete this.requestCallbacks[requestId];
              reject(new Error('request timeout'));
            }, this.requestCallBackTimeout);
          } catch (error) {
            reject(error); // 发送过程中出现错误
          }
        } else if (
          [this._socket!.CLOSING, this._socket!.CLOSED].includes(
            this._socket!.readyState,
          )
        ) {
          this.reconnect()
            .then(() => {
              setTimeout(trySend, 1000);
            })
            .catch(reject);
        } else if (this._socket!.readyState === this._socket!.CONNECTING) {
          setTimeout(trySend, 1000);
        }
      };

      trySend();
    });
  }
  heartbeat = () => {
    this.heartbeatTimer = setInterval(() => {
      if (this._socket?.readyState === WebSocket.OPEN) {
        this._socket.send(
          JSON.stringify({
            type: 'heartbeat',
            request_id: v4(),
            body: {},
          }),
        );
      }
    }, this.heartbeatTime);
  };
  public error(): void {
    this._socket!.onerror = (event) => {
      console.log('onerror', event);
    };
  }
  public close(): void {
    this._socket?.close();
    clearInterval(this.heartbeatTimer as ReturnType<typeof setInterval>);
    this._socket = null;
  }
  onMessage = () => {
    this._socket!.onmessage = (event) => {
      try {
        const { type, body } = JSON.parse(event.data);
        switch (type) {
          case 'copy':
            this.requestCallbacks[body.request_id](body);
            break;
        }
      } catch (error) {
        console.error(error);
      }
    };
  };
  createSocket = async () => {
    if (isWebSocketSupported) {
      return new WebSocket(this.url);
    } else if (isNodeEnv()) {
      const WebSocket = (await import('ws')).default;
      return new WebSocket(this.url);
    }
    return null;
  };
}

export default function createSocket(url: string, option: IWSOptions) {
  return new MSocket(url, option);
}
