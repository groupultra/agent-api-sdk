// Moobius-js-api-sdk v1.0.0 Copyright (c) 2024 moobius and contributors
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["moobius-api-sdk"] = factory());
})(this, (function () { 'use strict';

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

    var MoobiusApi = /** @class */ (function () {
        function MoobiusApi(config) {
            console.log(config);
        }
        MoobiusApi.prototype.request = function () { };
        return MoobiusApi;
    }());
    function createInstance(defaultConfig) {
        var context = new MoobiusApi(defaultConfig);
        var instance = bind(MoobiusApi.prototype.request, context);
        extend(instance, MoobiusApi.prototype, context, { allOwnKeys: true });
        extend(instance, context, null, { allOwnKeys: true });
        instance.create = function create(instanceConfig) {
            return createInstance(mergeDeep(defaultConfig, instanceConfig));
        };
        return instance;
    }
    var defaults = {};
    var moobius_api_agent = createInstance(defaults);

    return moobius_api_agent;

}));
//# sourceMappingURL=moobius-api-sdk.js.map
