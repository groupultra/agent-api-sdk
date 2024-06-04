import { bind, extend, mergeDeep } from '@/utils';
class MoobiusApi {
  constructor(config: any) {
    console.log(config);
  }
  request() {}
}

function createInstance(defaultConfig: any) {
  const context = new MoobiusApi(defaultConfig);
  const instance: any = bind(MoobiusApi.prototype.request, context);

  extend(instance, MoobiusApi.prototype, context, { allOwnKeys: true });

  extend(instance, context, null, { allOwnKeys: true });

  instance.create = function create(instanceConfig: any) {
    return createInstance(mergeDeep(defaultConfig, instanceConfig));
  };

  return instance;
}
const defaults = {};
const moobius_api_agent = createInstance(defaults);

export default moobius_api_agent;
