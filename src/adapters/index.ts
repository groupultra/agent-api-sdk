import http from './http';
import nodeSocket from './nodeSocket';
import webSocket from './webSocket';

const knownAdapters = {
  http,
  webSocket,
  nodeSocket,
};

export default {
  getAdapter: (id: keyof typeof knownAdapters) => {
    let adapter = knownAdapters[id];
    return adapter;
  },
  adapters: knownAdapters,
};
