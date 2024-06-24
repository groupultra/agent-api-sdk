import { isNodeEnv } from '@/utils/index';
import store from 'store2';
interface StoreItem<T> {
  value: T;
  expiry: number;
}

class StoreWithExpiry {
  private _store: any;
  constructor() {
    this._store = store;
    if (isNodeEnv()) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const LocalStorage = require('node-localstorage').LocalStorage;
      this._store.localstorage = new LocalStorage('./scratch');
    }
    // console.log('constructor', this._store);
  }
  set = <T>(key: string, value: T, ttl: number = 3600 * 1000): void => {
    try {
      const now = new Date();
      const item: StoreItem<T> = {
        value: value,
        expiry: now.getTime() + ttl,
      };
      this._store.set(key, item);
      console.log('set_success', this._store.get(key));
    } catch (error) {
      console.error('set_error', error);
    }
  };
  get = <T>(key: string): T | null => {
    const item = this._store.get(key) as StoreItem<T> | null;
    if (!item) {
      return null;
    }
    const now = new Date();
    if (now.getTime() > item.expiry) {
      this._store.remove(key);
      return null;
    }
    return item.value;
  };

  remove = (key: string): void => {
    this._store.remove(key);
  };

  clearAll = (): void => {
    this._store.clearAll();
  };
}

const storeWithExpiry = new StoreWithExpiry();
export default storeWithExpiry;
