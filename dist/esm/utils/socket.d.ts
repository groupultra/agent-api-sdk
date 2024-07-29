import type { WsConfigBase } from './socket.type';
import type { IWSOptions } from './socket.type';
export declare class MSocket {
    type: string;
    url: string;
    _socket: WebSocket | null;
    reconnectMaxCount: number;
    heartbeatTime: number;
    private requestCallBackTimeout;
    private requestCallbacks;
    heartbeatTimer: ReturnType<typeof setInterval> | null;
    constructor(url: string, option: IWSOptions);
    connect: () => Promise<void>;
    open(): void;
    reconnect: () => Promise<void>;
    send(data: WsConfigBase): Promise<void>;
    heartbeat: () => void;
    error(): void;
    close(): void;
    onMessage: () => void;
    createSocket: () => Promise<any>;
}
export default function createSocket(url: string, option: IWSOptions): MSocket;
