// 修复ts类型问题
export function bind(fn: Function, thisArg: any) {
  return function wrap(...arg: any[]) {
    return fn.apply(thisArg, arg);
  };
}
const typeOfTest = (type: string) => (thing: unknown) => typeof thing === type;

export const { isArray } = Array;

export const isFunction = typeOfTest('function');

function isObject(item: object) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export function mergeDeep(target: any, ...sources: any[]): any {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
  }
  return mergeDeep(target, ...sources);
}

function forEach(
  obj: any,
  fn: (a: any, b: any, c: any) => void,
  { allOwnKeys = false } = {},
) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys
      ? Object.getOwnPropertyNames(obj)
      : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
export const extend = (
  a: any,
  b: any,
  thisArg: any,
  { allOwnKeys }: { allOwnKeys: boolean } = { allOwnKeys: false },
) => {
  forEach(
    b,
    (val, key) => {
      if (thisArg && isFunction(val)) {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    },
    { allOwnKeys },
  );
  return a;
};

export const kindOf = ((cache) => (thing: any) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

export const formatUrl = (
  url: string,
  query: Record<string, string>,
): string => {
  if (url && query) {
    const hasQuery = url?.includes('?');
    url += Object.keys(query).length
      ? `${hasQuery ? '&' : '?'}${Object.keys(query)
          .map((key) => `${key}=${query[key]}`)
          .join('&')}`
      : '';
  }
  return url;
};

export const isNodeEnv = () => {
  return typeof process !== 'undefined' && kindOf(process) === 'process';
};
