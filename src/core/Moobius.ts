import type { MoobiusBasicConfig } from '@/index.d';
import { mergeDeep } from '@/utils/index';
class MoobiusSDK {
  defaults: MoobiusBasicConfig;
  config: MoobiusBasicConfig & {};
  constructor(instanceConfig: MoobiusBasicConfig) {
    this.defaults = instanceConfig;
    this.config = instanceConfig;
  }
  public init(config: MoobiusBasicConfig) {
    this.config = mergeDeep(this.defaults, config);
    console.log('init', this.config);
  }
}

export default MoobiusSDK;
