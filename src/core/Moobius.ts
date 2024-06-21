import adapters from '@/adapters/index';
import type { MoobiusBasicConfig } from '@/index.d';
import { mergeDeep } from '@/utils/index';
import dispatchHttpRequest from './dispatchHttpRequest';
export class MoobiusSDK {
  defaults: MoobiusBasicConfig;
  config: MoobiusBasicConfig & {};
  constructor(instanceConfig: MoobiusBasicConfig) {
    this.defaults = instanceConfig;
    this.config = instanceConfig;
  }
  public init(config: MoobiusBasicConfig) {
    this.config = mergeDeep(this.defaults, config);
    console.log('this.config', this.config);
    const Adapter = adapters.getAdapter(
      config.adapter || this.defaults.adapter,
    );
    console.log('adapter', Adapter);
    dispatchHttpRequest.call(this);
    return this;
  }
}

export default MoobiusSDK;
