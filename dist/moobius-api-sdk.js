// Moobius-js-api-sdk v1.0.0 Copyright (c) 2024 moobius and contributors
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.moobiusSdk = factory());
})(this, (function () { 'use strict';

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  }
  typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };

  function bind(fn, thisArg) {
      return function wrap() {
          var arg = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              arg[_i] = arguments[_i];
          }
          return fn.apply(thisArg, arg);
      };
  }
  var typeOfTest = function (type) { return function (thing) { return typeof thing === type; }; };
  var isArray = Array.isArray;
  var isFunction = typeOfTest('function');
  function isObject(item) {
      return item && typeof item === 'object' && !Array.isArray(item);
  }
  function mergeDeep(target) {
      var _a, _b;
      var sources = [];
      for (var _i = 1; _i < arguments.length; _i++) {
          sources[_i - 1] = arguments[_i];
      }
      if (!sources.length)
          return target;
      var source = sources.shift();
      if (isObject(target) && isObject(source)) {
          for (var key in source) {
              if (source.hasOwnProperty(key)) {
                  if (isObject(source[key])) {
                      if (!target[key])
                          Object.assign(target, (_a = {}, _a[key] = {}, _a));
                      mergeDeep(target[key], source[key]);
                  }
                  else {
                      Object.assign(target, (_b = {}, _b[key] = source[key], _b));
                  }
              }
          }
      }
      return mergeDeep.apply(void 0, __spreadArray([target], sources, false));
  }
  function forEach(obj, fn, _a) {
      var _b = _a === void 0 ? {} : _a, _c = _b.allOwnKeys, allOwnKeys = _c === void 0 ? false : _c;
      // Don't bother if no value provided
      if (obj === null || typeof obj === 'undefined') {
          return;
      }
      var i;
      var l;
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
      }
      else {
          // Iterate over object keys
          var keys = allOwnKeys
              ? Object.getOwnPropertyNames(obj)
              : Object.keys(obj);
          var len = keys.length;
          var key = void 0;
          for (i = 0; i < len; i++) {
              key = keys[i];
              fn.call(null, obj[key], key, obj);
          }
      }
  }
  var extend = function (a, b, thisArg, _a) {
      var _b = _a === void 0 ? { allOwnKeys: false } : _a, allOwnKeys = _b.allOwnKeys;
      forEach(b, function (val, key) {
          if (thisArg && isFunction(val)) {
              a[key] = bind(val, thisArg);
          }
          else {
              a[key] = val;
          }
      }, { allOwnKeys: allOwnKeys });
      return a;
  };

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, basedir, module) {
  	return module = {
  		path: basedir,
  		exports: {},
  		require: function (path, base) {
  			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
  		}
  	}, fn(module, module.exports), module.exports;
  }

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  }

  var store2 = createCommonjsModule(function (module) {
    (function (window, define) {
      var _ = {
        version: "2.14.3",
        areas: {},
        apis: {},
        nsdelim: '.',
        // utilities
        inherit: function inherit(api, o) {
          for (var p in api) {
            if (!o.hasOwnProperty(p)) {
              Object.defineProperty(o, p, Object.getOwnPropertyDescriptor(api, p));
            }
          }
          return o;
        },
        stringify: function stringify(d, fn) {
          return d === undefined || typeof d === "function" ? d + '' : JSON.stringify(d, fn || _.replace);
        },
        parse: function parse(s, fn) {
          // if it doesn't parse, return as is
          try {
            return JSON.parse(s, fn || _.revive);
          } catch (e) {
            return s;
          }
        },
        // extension hooks
        fn: function fn(name, _fn) {
          _.storeAPI[name] = _fn;
          for (var api in _.apis) {
            _.apis[api][name] = _fn;
          }
        },
        get: function get(area, key) {
          return area.getItem(key);
        },
        set: function set(area, key, string) {
          area.setItem(key, string);
        },
        remove: function remove(area, key) {
          area.removeItem(key);
        },
        key: function key(area, i) {
          return area.key(i);
        },
        length: function length(area) {
          return area.length;
        },
        clear: function clear(area) {
          area.clear();
        },
        // core functions
        Store: function Store(id, area, namespace) {
          var store = _.inherit(_.storeAPI, function (key, data, overwrite) {
            if (arguments.length === 0) {
              return store.getAll();
            }
            if (typeof data === "function") {
              return store.transact(key, data, overwrite);
            } // fn=data, alt=overwrite
            if (data !== undefined) {
              return store.set(key, data, overwrite);
            }
            if (typeof key === "string" || typeof key === "number") {
              return store.get(key);
            }
            if (typeof key === "function") {
              return store.each(key);
            }
            if (!key) {
              return store.clear();
            }
            return store.setAll(key, data); // overwrite=data, data=key
          });
          store._id = id;
          try {
            var testKey = '__store2_test';
            area.setItem(testKey, 'ok');
            store._area = area;
            area.removeItem(testKey);
          } catch (e) {
            store._area = _.storage('fake');
          }
          store._ns = namespace || '';
          if (!_.areas[id]) {
            _.areas[id] = store._area;
          }
          if (!_.apis[store._ns + store._id]) {
            _.apis[store._ns + store._id] = store;
          }
          return store;
        },
        storeAPI: {
          // admin functions
          area: function area(id, _area) {
            var store = this[id];
            if (!store || !store.area) {
              store = _.Store(id, _area, this._ns); //new area-specific api in this namespace
              if (!this[id]) {
                this[id] = store;
              }
            }
            return store;
          },
          namespace: function namespace(_namespace, singleArea, delim) {
            delim = delim || this._delim || _.nsdelim;
            if (!_namespace) {
              return this._ns ? this._ns.substring(0, this._ns.length - delim.length) : '';
            }
            var ns = _namespace,
              store = this[ns];
            if (!store || !store.namespace) {
              store = _.Store(this._id, this._area, this._ns + ns + delim); //new namespaced api
              store._delim = delim;
              if (!this[ns]) {
                this[ns] = store;
              }
              if (!singleArea) {
                for (var name in _.areas) {
                  store.area(name, _.areas[name]);
                }
              }
            }
            return store;
          },
          isFake: function isFake(force) {
            if (force) {
              this._real = this._area;
              this._area = _.storage('fake');
            } else if (force === false) {
              this._area = this._real || this._area;
            }
            return this._area.name === 'fake';
          },
          toString: function toString() {
            return 'store' + (this._ns ? '.' + this.namespace() : '') + '[' + this._id + ']';
          },
          // storage functions
          has: function has(key) {
            if (this._area.has) {
              return this._area.has(this._in(key)); //extension hook
            }
            return !!(this._in(key) in this._area);
          },
          size: function size() {
            return this.keys().length;
          },
          each: function each(fn, fill) {
            // fill is used by keys(fillList) and getAll(fillList))
            for (var i = 0, m = _.length(this._area); i < m; i++) {
              var key = this._out(_.key(this._area, i));
              if (key !== undefined) {
                if (fn.call(this, key, this.get(key), fill) === false) {
                  break;
                }
              }
              if (m > _.length(this._area)) {
                m--;
                i--;
              } // in case of removeItem
            }
            return fill || this;
          },
          keys: function keys(fillList) {
            return this.each(function (k, v, list) {
              list.push(k);
            }, fillList || []);
          },
          get: function get(key, alt) {
            var s = _.get(this._area, this._in(key)),
              fn;
            if (typeof alt === "function") {
              fn = alt;
              alt = null;
            }
            return s !== null ? _.parse(s, fn) : alt != null ? alt : s;
          },
          getAll: function getAll(fillObj) {
            return this.each(function (k, v, all) {
              all[k] = v;
            }, fillObj || {});
          },
          transact: function transact(key, fn, alt) {
            var val = this.get(key, alt),
              ret = fn(val);
            this.set(key, ret === undefined ? val : ret);
            return this;
          },
          set: function set(key, data, overwrite) {
            var d = this.get(key),
              replacer;
            if (d != null && overwrite === false) {
              return data;
            }
            if (typeof overwrite === "function") {
              replacer = overwrite;
              overwrite = undefined;
            }
            return _.set(this._area, this._in(key), _.stringify(data, replacer), overwrite) || d;
          },
          setAll: function setAll(data, overwrite) {
            var changed, val;
            for (var key in data) {
              val = data[key];
              if (this.set(key, val, overwrite) !== val) {
                changed = true;
              }
            }
            return changed;
          },
          add: function add(key, data, replacer) {
            var d = this.get(key);
            if (d instanceof Array) {
              data = d.concat(data);
            } else if (d !== null) {
              var type = _typeof(d);
              if (type === _typeof(data) && type === 'object') {
                for (var k in data) {
                  d[k] = data[k];
                }
                data = d;
              } else {
                data = d + data;
              }
            }
            _.set(this._area, this._in(key), _.stringify(data, replacer));
            return data;
          },
          remove: function remove(key, alt) {
            var d = this.get(key, alt);
            _.remove(this._area, this._in(key));
            return d;
          },
          clear: function clear() {
            if (!this._ns) {
              _.clear(this._area);
            } else {
              this.each(function (k) {
                _.remove(this._area, this._in(k));
              }, 1);
            }
            return this;
          },
          clearAll: function clearAll() {
            var area = this._area;
            for (var id in _.areas) {
              if (_.areas.hasOwnProperty(id)) {
                this._area = _.areas[id];
                this.clear();
              }
            }
            this._area = area;
            return this;
          },
          // internal use functions
          _in: function _in(k) {
            if (typeof k !== "string") {
              k = _.stringify(k);
            }
            return this._ns ? this._ns + k : k;
          },
          _out: function _out(k) {
            return this._ns ? k && k.indexOf(this._ns) === 0 ? k.substring(this._ns.length) : undefined :
            // so each() knows to skip it
            k;
          }
        },
        // end _.storeAPI
        storage: function storage(name) {
          return _.inherit(_.storageAPI, {
            items: {},
            name: name
          });
        },
        storageAPI: {
          length: 0,
          has: function has(k) {
            return this.items.hasOwnProperty(k);
          },
          key: function key(i) {
            var c = 0;
            for (var k in this.items) {
              if (this.has(k) && i === c++) {
                return k;
              }
            }
          },
          setItem: function setItem(k, v) {
            if (!this.has(k)) {
              this.length++;
            }
            this.items[k] = v;
          },
          removeItem: function removeItem(k) {
            if (this.has(k)) {
              delete this.items[k];
              this.length--;
            }
          },
          getItem: function getItem(k) {
            return this.has(k) ? this.items[k] : null;
          },
          clear: function clear() {
            for (var k in this.items) {
              this.removeItem(k);
            }
          }
        } // end _.storageAPI
      };
      var store =
      // safely set this up (throws error in IE10/32bit mode for local files)
      _.Store("local", function () {
        try {
          return localStorage;
        } catch (e) {}
      }());
      store.local = store; // for completeness
      store._ = _; // for extenders and debuggers...
      // safely setup store.session (throws exception in FF for file:/// urls)
      store.area("session", function () {
        try {
          return sessionStorage;
        } catch (e) {}
      }());
      store.area("page", _.storage("page"));
      if (typeof define === 'function' && define.amd !== undefined) {
        define('store2', [], function () {
          return store;
        });
      } else if (module.exports) {
        module.exports = store;
      } else {
        // expose the primary store fn to the global object and save conflicts
        if (window.store) {
          _.conflict = window.store;
        }
        window.store = store;
      }
    })(commonjsGlobal, commonjsGlobal && commonjsGlobal.define);
  });

  var StoreWithExpiry = /** @class */ (function () {
      function StoreWithExpiry() {
      }
      StoreWithExpiry.prototype.set = function (key, value, ttl) {
          if (ttl === void 0) { ttl = 3600 * 1000; }
          var now = new Date();
          var item = {
              value: value,
              expiry: now.getTime() + ttl,
          };
          store2.set(key, item);
      };
      StoreWithExpiry.prototype.get = function (key) {
          var item = store2.get(key);
          if (!item) {
              return null;
          }
          var now = new Date();
          if (now.getTime() > item.expiry) {
              store2.remove(key);
              return null;
          }
          return item.value;
      };
      StoreWithExpiry.prototype.remove = function (key) {
          store2.remove(key);
      };
      StoreWithExpiry.prototype.clearAll = function () {
          store2.clearAll();
      };
      return StoreWithExpiry;
  }());
  var storeWithExpiry = new StoreWithExpiry();

  var MoobiusSDK = /** @class */ (function () {
      function MoobiusSDK(instanceConfig) {
          this.defaults = instanceConfig;
          this.config = instanceConfig;
      }
      MoobiusSDK.prototype.init = function (config) {
          this.config = mergeDeep(this.defaults, config);
          console.log('init', this.config);
          storeWithExpiry.set('test', 'hhhhh', 100000);
          console.log(storeWithExpiry.get('test'));
      };
      return MoobiusSDK;
  }());

  function createInstance(defaultConfig) {
      var context = new MoobiusSDK(defaultConfig);
      var instance = bind(MoobiusSDK.prototype.init, context);
      extend(instance, MoobiusSDK.prototype, context, { allOwnKeys: true });
      extend(instance, context, null, { allOwnKeys: true });
      return instance;
  }
  var defaults = {
      url: 'https://api.moobius.net',
  };
  var moobiusSDk = createInstance(defaults);

  return moobiusSDk;

}));
//# sourceMappingURL=moobius-api-sdk.js.map
