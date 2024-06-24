import * as socketConfig from '@/config/socket/index';
import createSocket from '@/utils/socket';
import type MoobiusSDK from './Moobius';
type MoobiusSDKWithIndex = MoobiusSDK & {
  socket: ReturnType<typeof createSocket>;
  send: (type: keyof typeof socketConfig, data: any) => void;
};
export default function dispatchHttpRequest(this: MoobiusSDK) {
  const self = this as MoobiusSDKWithIndex;
  self.socket = createSocket(this.config.wsUrl as string, {
    onMessageEvent: {},
  });
  self.send = async (type: keyof typeof socketConfig, data: any) => {
    const typeName = Object.keys(socketConfig) as Array<
      keyof typeof socketConfig
    >;
    if (!typeName.includes(type)) {
      throw new Error(`${type}: type is not exist`);
    }
    const config = socketConfig[type];
  };
  console.log(socketConfig);
}
