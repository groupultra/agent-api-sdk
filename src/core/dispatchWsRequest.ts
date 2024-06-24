import createSocket from '@/utils/socket';
import type MoobiusSDK from './Moobius';
type MoobiusSDKWithIndex = MoobiusSDK & {
  socket: ReturnType<typeof createSocket>;
};
export default function dispatchHttpRequest(this: MoobiusSDK) {
  const self = this as MoobiusSDKWithIndex;
  self.socket = createSocket(this.config.wsUrl as string, {
    onMessageEvent: {},
  });
}
