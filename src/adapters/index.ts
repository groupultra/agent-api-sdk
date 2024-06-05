import { isArray, isFunction } from '@/utils/index';
import nodeSocket from './nodeSocket';
import webSocket from './webSocket';
const knownAdapters = {
  webSocket,
  nodeSocket,
};
const isResolvedHandle = (adapter: any) =>
  isFunction(adapter) || adapter === null || adapter === false;
const renderReason = (reason: string) => `- ${reason}`;
export default {
  getAdapter: (adapters: Array<keyof typeof knownAdapters>) => {
    let _adapters = isArray(adapters) ? adapters : [adapters];

    const { length } = adapters;
    let nameOrAdapter: any;
    let adapter: any;

    const rejectedReasons: any = {};

    for (let i = 0; i < length; i++) {
      nameOrAdapter = _adapters[i];
      let id;

      adapter = nameOrAdapter;

      if (!isResolvedHandle(nameOrAdapter)) {
        adapter =
          knownAdapters[
            (id = String(nameOrAdapter)) as keyof typeof knownAdapters
          ];

        if (adapter === undefined) {
          console.error(`Unknown adapter '${id}'`);
        }
      }

      if (adapter) {
        break;
      }

      rejectedReasons[id || '#' + i] = adapter;
    }

    if (!adapter) {
      const reasons: any = Object.entries(rejectedReasons).map(
        ([id, state]) =>
          `adapter ${id} ` +
          (state === false
            ? 'is not supported by the environment'
            : 'is not available in the build'),
      );

      let s = length
        ? reasons.length > 1
          ? 'since :\n' + reasons.map(renderReason).join('\n')
          : ' ' + renderReason(reasons[0])
        : 'as no adapter specified';

      console.error(
        `There is no suitable adapter to dispatch the request ` + s,
        'ERR_NOT_SUPPORT',
      );
    }

    return adapter;
  },
  adapters: knownAdapters,
};
