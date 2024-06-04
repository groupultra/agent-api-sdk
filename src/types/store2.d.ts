declare module 'store2' {
  interface StoreAPI {
    set(key: string, value: any): void;
    get<T = any>(key: string): T | null;
    remove(key: string): void;
    clearAll(): void;
  }

  const store: StoreAPI;

  export default store;
}
