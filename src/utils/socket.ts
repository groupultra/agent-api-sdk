import { formatUrl, isNodeEnv, mergeDeep } from '@/utils/index';
import { v4 } from 'uuid';
import type { IWSOptions } from './socket.type';
import { defaultWsOptions } from './socket.type';

const isWebSocketSupported = typeof WebSocket !== 'undefined';
export class MSocket {
  public type: string = 'client';
  public url: string = '';
  public _socket: WebSocket | null = null;
  public reconnectMaxCount: number = 3;
  public heartbeatTime: number = 6000;
  public heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  constructor(url: string, option: IWSOptions) {
    const mergeOption: IWSOptions = mergeDeep(defaultWsOptions, option);
    this.url = formatUrl(url, mergeOption?.query as Record<string, string>);
    this.reconnectMaxCount = mergeOption.autoReconnect?.reconnectMaxCount || 3;
    this.heartbeatTime = mergeOption.heartbeat?.interval || 3000;
    this.connect();
  }
  connect = () => {
    this.close();
    this._socket = this.createSocket();
    if (this._socket) {
      this.open();
    }
    this.error();
  };
  public open(): void {
    this._socket!.onopen = () => {
      console.log('onopen');
      this.heartbeat();
    };
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
  onMessage = (event: MessageEvent) => {
    console.log('onMessage', event);
  };
  createSocket = () => {
    if (isWebSocketSupported) {
      return new WebSocket(this.url);
    } else if (isNodeEnv()) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const WebSocket = require('ws');
      return new WebSocket(this.url);
    }
    return null;
  };
}

export default function createSocket(url: string, option: IWSOptions) {
  return new MSocket(url, option);
}
