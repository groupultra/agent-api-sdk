export declare function bind(fn: Function, thisArg: any): (...arg: any[]) => any;
export declare const isArray: (arg: any) => arg is any[];
export declare const isFunction: (thing: unknown) => boolean;
export declare function mergeDeep(target: any, ...sources: any[]): any;
export declare const extend: (a: any, b: any, thisArg: any, { allOwnKeys }?: {
    allOwnKeys: boolean;
}) => any;
export declare const kindOf: (thing: any) => any;
export declare const formatUrl: (url: string, query: Record<string, string>) => string;
export declare const isNodeEnv: () => boolean;
