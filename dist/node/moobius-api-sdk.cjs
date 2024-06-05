// Moobius-js-api-sdk v1.0.0 Copyright (c) 2024 moobius and contributors
'use strict';

const WebSocket$1 = require('ws');
const uuid = require('uuid');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

const WebSocket__default = /*#__PURE__*/_interopDefaultLegacy(WebSocket$1);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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

// 修复ts类型问题
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
var kindOf = (function (cache) { return function (thing) {
    var str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
}; })(Object.create(null));

var isNodeSocketSupported = typeof process !== 'undefined' && kindOf(process) === 'process';
const nodeSocket = isNodeSocketSupported && /** @class */ (function () {
    function MSocket() {
        this.type = 'node';
        console.log('node', this, WebSocket__default["default"]);
    }
    return MSocket;
}());

var Heartbeat = function () {
    return {
        type: 'heartbeat',
        request_id: uuid.v4(),
        body: {},
    };
};

var _a;
var isWebSocketSupported = typeof WebSocket !== 'undefined';
const webSocket = isWebSocketSupported && (_a = /** @class */ (function () {
        function MSocket(url, option) {
            var _this = this;
            var _a, _b;
            this.type = 'client';
            this.socket = null;
            this.reconnectMaxCount = 3;
            this.heartbeatTime = 6000;
            this.requestCallbacks = {};
            this.heartbeatTimer = null;
            this.connect = function () {
                _this.close();
                _this.socket = new WebSocket(_this.url);
                _this.onError();
                _this.onOpen();
                _this.onMessage();
            };
            this.login = function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            }); };
            this.onMessage = function () {
                _this.socket.onmessage = function (event) { return __awaiter(_this, void 0, void 0, function () {
                    var data, type, body, request_id, status_1, origin_type, context;
                    return __generator(this, function (_a) {
                        try {
                            data = JSON.parse(event === null || event === void 0 ? void 0 : event.data);
                            type = data.type, body = data.body;
                            request_id = body.request_id, status_1 = body.status, origin_type = body.origin_type, context = body.context;
                            // 分为两大类 copy是服务端针对requestid作出的响应
                            if (type === 'copy') {
                                if (request_id && this.requestCallbacks[request_id]) {
                                    if (!status_1) {
                                        // 失败
                                        console.error("".concat(origin_type, " : ").concat(context.message));
                                        if (context.message.includes('access_token') ||
                                            context.message.includes('login yet')) {
                                            // console.log(context.message);
                                            // const store: Store = getStore()!;
                                            // await store.user.fetchSignOut();
                                            console.log('refresh token');
                                        }
                                    }
                                    if (origin_type === 'user_login') {
                                        // 修改登录状态处理未登录的时候发送事件
                                        // WS.isLoggedIn = status;
                                        this.processMessageQueue();
                                    }
                                    this.requestCallbacks[request_id](data);
                                    delete this.requestCallbacks[request_id];
                                }
                                return [2 /*return*/];
                            }
                            // 主动update的message不能使用对应的requestid
                            if (this.socketCustomMessageEventList[type]) {
                                this.socketCustomMessageEventList[type](data);
                            }
                        }
                        catch (error) {
                            console.error(error);
                        }
                        return [2 /*return*/];
                    });
                }); };
            };
            this.processMessageQueue = function () {
                // while (WS.unloginMessageQueue.length > 0) {
                //   const { data, callback } = WS.unloginMessageQueue.shift();
                //   this.send(data, callback);
                // }
            };
            this.ignoreLoginMessage = function (data) {
                return data.type === 'user_login' || data.type === 'ping';
            };
            this.reconnect = function () {
                return new Promise(function (resolve, reject) {
                    _this.connect();
                    resolve({});
                });
            };
            var mergeOption = mergeDeep(option, {
                autoReconnect: {
                    reconnectMaxCount: 3,
                },
                heartbeat: {
                    interval: 10000,
                },
                query: {},
            });
            this.url = this.formatUrl(url, mergeOption.query);
            this.reconnectMaxCount =
                ((_a = mergeOption.autoReconnect) === null || _a === void 0 ? void 0 : _a.reconnectMaxCount) || 3;
            this.heartbeatTime = ((_b = mergeOption.heartbeat) === null || _b === void 0 ? void 0 : _b.interval) || 3000;
            this.socketCustomMessageEventList = (mergeOption === null || mergeOption === void 0 ? void 0 : mergeOption.onMessageEvent) || {};
            this.connect();
        }
        MSocket.prototype.onOpen = function () {
            var _this = this;
            if (this.socket) {
                this.socket.onopen = function () {
                    _this.login();
                    if (_this.heartbeatTime) {
                        _this.startHeartbeat();
                    }
                };
            }
        };
        MSocket.prototype.startHeartbeat = function () {
            var _this = this;
            var int = this.heartbeatTime;
            this.heartbeatTimer = setInterval(function () {
                _this.send(Heartbeat());
            }, int);
        };
        MSocket.prototype.send = function (data, callback) {
            var _this = this;
            if (callback === void 0) { callback = function () { }; }
            return new Promise(function (resolve, reject) {
                if (!_this.socket) {
                    reject(new Error('socket is null'));
                    return;
                }
                var trySend = function () {
                    if (!_this.socket) {
                        reject(new Error('socket is null'));
                        return;
                    }
                    // const isIgnoreLoginMessage = this.ignoreLoginMessage(data);
                    // console.log(WS.isLoggedIn, isIgnoreLoginMessage)
                    // if (!isIgnoreLoginMessage && !WS.isLoggedIn) {
                    //   WS.unloginMessageQueue.push({
                    //     data,
                    //     callback,
                    //   });
                    //   return;
                    // }
                    if (_this.socket.readyState === _this.socket.OPEN) {
                        try {
                            // 发送消息前收集onMessage的对应回调函数
                            _this.requestCallbacks[data.request_id || uuid.v4()] = function (response) {
                                callback(response);
                                resolve(response);
                            };
                            _this.socket.send(JSON.stringify(data));
                            resolve(); // 消息成功发送
                        }
                        catch (error) {
                            reject(error); // 发送过程中出现错误
                        }
                    }
                    else if ([_this.socket.CLOSING, _this.socket.CLOSED].includes(_this.socket.readyState)) {
                        _this.reconnect()
                            .then(function () {
                            setTimeout(trySend, 1000); // 重连成功后重试发送
                        })
                            .catch(reject); // 重连失败
                    }
                    else if (_this.socket.readyState === _this.socket.CONNECTING) {
                        setTimeout(trySend, 1000); // 1秒后重试
                    }
                };
                trySend();
            });
        };
        MSocket.prototype.close = function () {
            var _a;
            (_a = this.socket) === null || _a === void 0 ? void 0 : _a.close();
            clearInterval(this.heartbeatTimer);
            this.socket = null;
        };
        MSocket.prototype.onError = function () {
            if (this.socket) {
                this.socket.onerror = function (event) {
                    console.log('socket:error:event:', event);
                };
            }
        };
        MSocket.prototype.formatUrl = function (url, query) {
            var hasQuery = url.includes('?');
            url += Object.keys(query).length
                ? "".concat(hasQuery ? '&' : '?').concat(Object.keys(query)
                    .map(function (key) { return "".concat(key, "=").concat(query[key]); })
                    .join('&'))
                : '';
            return url;
        };
        return MSocket;
    }()),
    _a.isLoggedIn = false,
    _a.unloginMessageQueue = [],
    _a);

var knownAdapters = {
    webSocket: webSocket,
    nodeSocket: nodeSocket,
};
var isResolvedHandle = function (adapter) {
    return isFunction(adapter) || adapter === null || adapter === false;
};
var renderReason = function (reason) { return "- ".concat(reason); };
const adapters = {
    getAdapter: function (adapters) {
        var _adapters = isArray(adapters) ? adapters : [adapters];
        var length = adapters.length;
        var nameOrAdapter;
        var adapter;
        var rejectedReasons = {};
        for (var i = 0; i < length; i++) {
            nameOrAdapter = _adapters[i];
            var id = void 0;
            adapter = nameOrAdapter;
            if (!isResolvedHandle(nameOrAdapter)) {
                adapter =
                    knownAdapters[(id = String(nameOrAdapter))];
                if (adapter === undefined) {
                    console.error("Unknown adapter '".concat(id, "'"));
                }
            }
            if (adapter) {
                break;
            }
            rejectedReasons[id || '#' + i] = adapter;
        }
        if (!adapter) {
            var reasons = Object.entries(rejectedReasons).map(function (_a) {
                var id = _a[0], state = _a[1];
                return "adapter ".concat(id, " ") +
                    (state === false
                        ? 'is not supported by the environment'
                        : 'is not available in the build');
            });
            var s = length
                ? reasons.length > 1
                    ? 'since :\n' + reasons.map(renderReason).join('\n')
                    : ' ' + renderReason(reasons[0])
                : 'as no adapter specified';
            console.error("There is no suitable adapter to dispatch the request " + s, 'ERR_NOT_SUPPORT');
        }
        return adapter;
    },
    adapters: knownAdapters,
};

var MoobiusSDK = /** @class */ (function () {
    function MoobiusSDK(instanceConfig) {
        this.defaults = instanceConfig;
        this.config = instanceConfig;
    }
    MoobiusSDK.prototype.init = function (config) {
        this.config = mergeDeep(this.defaults, config);
        // console.log('init', this.config);
        // storage.set('test', 'hhhhh', 100000);
        // console.log(storage.get('test'));
        var adapter = new (adapters.getAdapter(config.adapter || this.defaults.adapter))();
        console.log(adapter.type);
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
    adapter: ['webSocket', 'nodeSocket'],
    url: 'https://api.moobius.net',
};
var moobiusSDk = createInstance(defaults);

module.exports = moobiusSDk;
//# sourceMappingURL=moobius-api-sdk.cjs.map
