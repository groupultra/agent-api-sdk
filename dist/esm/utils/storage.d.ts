declare class StoreWithExpiry {
    private _store;
    constructor();
    set: <T>(key: string, value: T, ttl?: number) => void;
    get: <T>(key: string) => T | null;
    remove: (key: string) => void;
    clearAll: () => void;
}
declare const storeWithExpiry: StoreWithExpiry;
export default storeWithExpiry;
