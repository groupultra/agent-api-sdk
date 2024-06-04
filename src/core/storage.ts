import store from 'store2';

interface StoreItem<T> {
  value: T;
  expiry: number;
}

class StoreWithExpiry {
  set<T>(key: string, value: T, ttl: number = 3600 * 1000): void {
    const now = new Date();
    const item: StoreItem<T> = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    store.set(key, item);
  }

  get<T>(key: string): T | null {
    const item = store.get(key) as StoreItem<T> | null;
    if (!item) {
      return null;
    }
    const now = new Date();
    if (now.getTime() > item.expiry) {
      store.remove(key);
      return null;
    }
    return item.value;
  }

  remove(key: string): void {
    store.remove(key);
  }

  clearAll(): void {
    store.clearAll();
  }
}

const storeWithExpiry = new StoreWithExpiry();
export default storeWithExpiry;
