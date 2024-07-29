import type { MoobiusBasicConfig } from '@/index.d';
import MoobiusBASIC from './baseMoobius';
export declare class MoobiusSDK extends MoobiusBASIC {
    constructor(instanceConfig: MoobiusBasicConfig);
    init(config: MoobiusBasicConfig): this;
}
export default MoobiusSDK;
