import type { MoobiusBasicConfig } from '@/index.d';
import { mergeDeep } from '@/utils/index';
import MoobiusBASIC from './baseMoobius';
import dispatchHttpRequest from './dispatchHttpRequest';
import dispatchWsRequest from './dispatchWsRequest';

export class MoobiusSDK extends MoobiusBASIC {
  constructor(instanceConfig: MoobiusBasicConfig) {
    super();
    this.defaults = instanceConfig;
    this.config = instanceConfig;
  }
  public init(config: MoobiusBasicConfig) {
    this.config = mergeDeep(this.defaults, config);
    dispatchHttpRequest.call(this);
    dispatchWsRequest.call(this);
    return this;
  }
}

export default MoobiusSDK;
