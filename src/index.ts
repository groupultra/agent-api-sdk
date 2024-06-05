import type { MoobiusBasicConfig } from '@/index.d';
import { bind, extend } from '@/utils/index';
import MoobiusSDK from './core/Moobius';
function createInstance(defaultConfig: MoobiusBasicConfig) {
  const context = new MoobiusSDK(defaultConfig);
  const instance = bind(MoobiusSDK.prototype.init, context);

  extend(instance, MoobiusSDK.prototype, context, { allOwnKeys: true });

  extend(instance, context, null, { allOwnKeys: true });
  return instance;
}

const defaults = {
  adapter: ['webSocket', 'nodeSocket'],
  url: 'https://api.moobius.net',
};

const moobiusSDk = createInstance(defaults);
export default moobiusSDk;
