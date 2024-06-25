import type { MoobiusBasicConfig } from '@/index.d';
import { bind, extend } from '@/utils/index';
import MoobiusSDK from './core/Moobius';
function createInstance(defaultConfig: MoobiusBasicConfig) {
  const context = new MoobiusSDK(defaultConfig);
  const instance = bind(MoobiusSDK.prototype.init, context);

  extend(instance, MoobiusSDK.prototype, context, { allOwnKeys: true });

  extend(instance, context, null, { allOwnKeys: true });
  console.log('instance', instance);
  return instance;
}

const defaults = {
  httpUrl: 'https://api.moobius.net',
  wsUrl: 'wss://ws.moobius.net',
};

const moobiusSDk = createInstance(defaults);
export default moobiusSDk;
