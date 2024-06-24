import { formatUrl, isNodeEnv, mergeDeep } from '@/utils/index';
import type { IWSOptions } from './socket.type';
import { defaultWsOptions } from './socket.type';
const isWebSocketSupported = typeof WebSocket !== 'undefined';
export class MSocket {
  public type: string = 'client';
  public url: string = '';
  public _socket: WebSocket | null = null;
  public reconnectMaxCount: number = 3;
  public heartbeatTime: number = 6000;

  constructor(url: string, option: IWSOptions) {
    const mergeOption: IWSOptions = mergeDeep(defaultWsOptions, option);
    this.url = formatUrl(url, mergeOption?.query as Record<string, string>);
    this.reconnectMaxCount = mergeOption.autoReconnect?.reconnectMaxCount || 3;
    this.heartbeatTime = mergeOption.heartbeat?.interval || 3000;
    this._socket = this.createSocket();
    // this.socketCustomMessageEventList = mergeOption?.onMessageEvent || {};
    // this.connect();
  }
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
