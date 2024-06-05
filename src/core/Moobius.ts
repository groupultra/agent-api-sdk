import adapters from '@/adapters/index';
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
    // console.log('init', this.config);
    // storage.set('test', 'hhhhh', 100000);
    // console.log(storage.get('test'));
    const adapter = new (adapters.getAdapter(
      config.adapter || this.defaults.adapter,
    ))();
    console.log(adapter.type);
  }
}

export default MoobiusSDK;
