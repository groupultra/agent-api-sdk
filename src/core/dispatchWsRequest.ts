import * as socketConfig from '@/config/socket/index';
import type MoobiusBASIC from '@/core/baseMoobius';
import createSocket from '@/utils/socket';

export default function dispatchHttpRequest(this: MoobiusBASIC) {
  this.socket = createSocket(this.config.wsUrl as string, {
    onMessageEvent: {},
  });
  this.send = async (type: keyof typeof socketConfig, data: any) => {
    const typeName = Object.keys(socketConfig) as Array<
      keyof typeof socketConfig
    >;
    if (!typeName.includes(type)) {
      throw new Error(`${type}: type is not exist`);
    }
    const getConfig = socketConfig[type];
    const config = getConfig && (getConfig as any)(data);
    await this.socket.send({
      ...config,
    } as any);
  };
  // console.log(socketConfig);
}
