// Moobius-js-api-sdk v1.0.0 Copyright (c) 2024 moobius and contributors
'use strict';

const axios = require('axios');
const store = require('store2');
const uuid = require('uuid');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    const n = Object.create(null);
    if (e) {
        for (const k in e) {
            if (k !== 'default') {
                const d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        }
    }
    n["default"] = e;
    return Object.freeze(n);
}

const axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
const store__default = /*#__PURE__*/_interopDefaultLegacy(store);

// 修复ts类型问题
function bind(fn, thisArg) {
    return function wrap(...arg) {
        return fn.apply(thisArg, arg);
    };
}
const typeOfTest = (type) => (thing) => typeof thing === type;
const { isArray } = Array;
const isFunction = typeOfTest('function');
function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}
function mergeDeep(target, ...sources) {
    if (!sources.length)
        return target;
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (isObject(source[key])) {
                    if (!target[key])
                        Object.assign(target, { [key]: {} });
                    mergeDeep(target[key], source[key]);
                }
                else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }
    }
    return mergeDeep(target, ...sources);
}
function forEach(obj, fn, { allOwnKeys = false } = {}) {
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
    }
    else {
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
const extend = (a, b, thisArg, { allOwnKeys } = { allOwnKeys: false }) => {
    forEach(b, (val, key) => {
        if (thisArg && isFunction(val)) {
            a[key] = bind(val, thisArg);
        }
        else {
            a[key] = val;
        }
    }, { allOwnKeys });
    return a;
};
const kindOf = ((cache) => (thing) => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));
const formatUrl = (url, query) => {
    if (url && query) {
        const hasQuery = url === null || url === void 0 ? void 0 : url.includes('?');
        url += Object.keys(query).length
            ? `${hasQuery ? '&' : '?'}${Object.keys(query)
                .map((key) => `${key}=${query[key]}`)
                .join('&')}`
            : '';
    }
    return url;
};
const isNodeEnv = () => {
    return typeof process !== 'undefined' && kindOf(process) === 'process';
};

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

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const signUp = (params) => ({
    url: '/auth/sign_up',
    method: 'POST',
    data: params,
    config: {
        ignoreAuth: true,
    },
});
const signIn = (params) => ({
    url: '/auth/sign_in',
    method: 'POST',
    data: params,
    config: {
        ignoreAuth: true,
    },
});
const signOut = (params) => ({
    url: '/auth/sign_out',
    method: 'POST',
    data: params,
    config: {
        ignoreAuth: true,
    },
});
const refresh = (params) => ({
    url: '/auth/refresh',
    method: 'POST',
    data: params,
    config: {
        ignoreAuth: true,
    },
});
const confirmSignUp = (params) => ({
    url: '/auth/confirm_sign_up',
    method: 'POST',
    data: params,
    config: {
        ignoreAuth: true,
    },
});
const resendConfirm = (params) => ({
    url: '/auth/resend_confirmation',
    method: 'POST',
    data: params,
    config: {
        ignoreAuth: true,
    },
});
const confirmResetPassword = (params) => ({
    url: '/auth/confirm_reset_password',
    method: 'POST',
    data: params,
    config: {
        ignoreAuth: true,
    },
});
const forgotPassword = (params) => ({
    url: '/auth/forgot_password',
    method: 'POST',
    data: params,
    config: {
        ignoreAuth: true,
    },
});

const auth = /*#__PURE__*/Object.freeze({
    __proto__: null,
    signUp: signUp,
    signIn: signIn,
    signOut: signOut,
    refresh: refresh,
    confirmSignUp: confirmSignUp,
    resendConfirm: resendConfirm,
    confirmResetPassword: confirmResetPassword,
    forgotPassword: forgotPassword
});

const create = (channel_name, channel_description) => ({
    url: '/channel/create',
    method: 'POST',
    data: {
        channel_name,
        context: {
            channel_description,
        },
    },
});
const update = (channel_id, channel_name) => ({
    url: '/channel/update',
    method: 'POST',
    data: {
        channel_id,
        channel_name,
    },
});
const popular = () => ({
    url: '/channel/popular',
    method: 'GET',
});
const list = () => ({
    url: '/channel/list',
    method: 'GET',
});
/** **********
 * [history]
 */
const historyMessage = (params) => {
    params.before === 0
        ? delete params.before
        : (params.before = params.before / 1000);
    params.after === 0
        ? delete params.after
        : (params.after = params.after / 1000);
    return {
        url: '/channel/history_message',
        method: 'GET',
        data: params,
    };
};

const channel = /*#__PURE__*/Object.freeze({
    __proto__: null,
    create: create,
    update: update,
    popular: popular,
    list: list,
    historyMessage: historyMessage
});

// export const fetchFileUpload = async (
const fetchFileDownload = (pathname) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        url: pathname,
        method: 'GET',
    };
});

const file = /*#__PURE__*/Object.freeze({
    __proto__: null,
    fetchFileDownload: fetchFileDownload
});

const getCurrentInfo = () => ({
    url: '/user/info',
    method: 'GET',
});
const updateCurrentInfo = (params) => ({
    url: '/user/info',
    method: 'POST',
    data: params,
});
/** **********
 * [whistle/ group]
 */
const groupList = (channel_id) => ({
    url: '/user/group/list',
    method: 'GET',
    data: {
        channel_id,
    },
});
const groupUpdate = (data) => ({
    url: '/user/group/update',
    method: 'POST',
    data,
});
const groupCreate = (data) => ({
    url: '/user/group/create',
    method: 'POST',
    data,
});
const groupDel = (channel_id, group_id) => ({
    url: '/user/group/delete',
    method: 'POST',
    data: {
        channel_id,
        group_id,
    },
});
/** **********
 * [temp]
 */
const getGroupTemp = (channel_id) => ({
    url: '/user/group/temp',
    method: 'GET',
    data: {
        channel_id,
    },
});
const updateGrouptemp = (data) => ({
    url: '/user/group/temp',
    method: 'POST',
    data,
});
/** **********
 * [TargetGroup description]
 */
const group = (data) => ({
    url: '/user/group',
    method: 'GET',
    data,
});
const ServiceGroup = (group_id) => ({
    url: '/service/group',
    method: 'GET',
    data: {
        group_id,
    },
});
/** **********
 * [Character]
 */
const characterFetchProfile = (character_list) => ({
    url: '/character/fetch_profile',
    method: 'GET',
    data: {
        character_list,
    },
});
const getUserProfile = (character_list) => ({
    url: '/character/fetch_profile',
    method: 'POST',
    data: {
        character_list,
    },
});

const user = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getCurrentInfo: getCurrentInfo,
    updateCurrentInfo: updateCurrentInfo,
    groupList: groupList,
    groupUpdate: groupUpdate,
    groupCreate: groupCreate,
    groupDel: groupDel,
    getGroupTemp: getGroupTemp,
    updateGrouptemp: updateGrouptemp,
    group: group,
    ServiceGroup: ServiceGroup,
    characterFetchProfile: characterFetchProfile,
    getUserProfile: getUserProfile
});

const httpConfig = {
    auth,
    channel,
    file,
    user,
};

class StoreWithExpiry {
    constructor() {
        this.set = (key, value, ttl = 3600 * 1000) => {
            try {
                const now = new Date();
                const item = {
                    value: value,
                    expiry: now.getTime() + ttl,
                };
                this._store.set(key, item);
                console.log('set_success', this._store.get(key));
            }
            catch (error) {
                console.error('set_error', error);
            }
        };
        this.get = (key) => {
            const item = this._store.get(key);
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
        this.remove = (key) => {
            this._store.remove(key);
        };
        this.clearAll = () => {
            this._store.clearAll();
        };
        this._store = store__default["default"];
        if (isNodeEnv()) {
            Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('node-localstorage')); }).then(({ LocalStorage }) => {
                this._store.localstorage = new LocalStorage('./scratch');
            });
        }
    }
}
const storeWithExpiry = new StoreWithExpiry();

const SUCCESS_CODE = 10000;
const AUTHERROT_CODE = 10005;
const UNCONFIRMED_MSG = 'UNCONFIRMED';
const createAxios = ({ baseURL, timeout = 3000, }) => {
    const instance = axios__default["default"].create({
        baseURL,
        timeout,
    });
    instance.interceptors.request.use((config) => {
        const internalConfig = config;
        if (!(internalConfig.config && internalConfig.config.ignoreAuth)) {
            const userInfo = storeWithExpiry.get('userInfo');
            console.log('userInfo:::', userInfo);
            if (!userInfo) {
                // 获取不到用户信息 可能未登录 可能token过期
                return Promise.reject(new Error(`You do not have permission to request ${config.url}`));
            }
            if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.AccessToken) {
                internalConfig.headers['Auth-Origin'] = 'cognito';
                internalConfig.headers.Authorization = `${userInfo === null || userInfo === void 0 ? void 0 : userInfo.TokenType} ${userInfo === null || userInfo === void 0 ? void 0 : userInfo.AccessToken}`;
            }
            delete internalConfig.config;
        }
        return internalConfig;
    });
    instance.interceptors.response.use((response) => {
        const { data } = response;
        if (data.code === SUCCESS_CODE) {
            return data;
        }
        if (data.code === AUTHERROT_CODE) {
            // 重新登录
            return Promise.reject(new Error(UNCONFIRMED_MSG));
        }
        return Promise.reject(new Error(data.msg));
    }, (error) => {
        return Promise.reject(error);
    });
    return instance;
};

const LOGIN_METHODNAME = 'signIn';
function dispatchHttpRequest$1() {
    const self = this;
    const fetch = createAxios({
        baseURL: this.config.httpUrl,
    });
    const _keys = Object.keys(httpConfig);
    _keys.forEach((key) => {
        const subKeys = Object.keys(httpConfig[key]);
        self[key] = subKeys.reduce((acc, methodName) => {
            const getConfig = httpConfig[key][methodName];
            acc[methodName] = (data) => __awaiter(this, void 0, void 0, function* () {
                if (typeof getConfig !== 'function') {
                    throw new Error('getConfig is not a function');
                }
                const config = getConfig && getConfig(data);
                const result = yield fetch(config);
                if (methodName === LOGIN_METHODNAME) {
                    const { AccessToken, ExpiresIn, RefreshToken, TokenType } = result.data.AuthenticationResult;
                    storeWithExpiry.set('userInfo', {
                        AccessToken,
                        ExpiresIn,
                        RefreshToken,
                        TokenType,
                    }, ExpiresIn * 1000);
                    //@ts-ignore
                    self.send && self.send('user_login');
                }
                return result;
            });
            return acc;
        }, {});
    });
}

const user_login = (access_token = '', loginType = 'cognito') => {
    var _a;
    return {
        type: 'user_login',
        request_id: uuid.v4(),
        access_token: ((_a = storeWithExpiry.get('userInfo')) === null || _a === void 0 ? void 0 : _a.AccessToken) || access_token,
        auth_origin: loginType,
    };
};
const MsgUp = ({ type, value, recipients = '', }) => {
    //   const store = getStore();
    return {
        type: 'message_up',
        request_id: uuid.v4(),
        user_id: '',
        body: {
            subtype: type,
            content: typeof value === 'string'
                ? {
                    [type === 'text' ? 'text' : 'path']: value,
                }
                : value,
            channel_id: '',
            timestamp: Date.now(),
            recipients,
        },
    };
};
const FeatureCall = ({ featureId, arguments: arg, }) => {
    //   const store = getStore();
    return {
        type: 'button_click',
        request_id: uuid.v4(),
        user_id: '',
        body: {
            button_id: featureId,
            channel_id: '',
            arguments: arg,
            context: {},
        },
    };
};
const MenuClick = ({ item_id, message_id, message_subtype, message_content, arguments: arg, }) => {
    //   const store = getStore();
    return {
        type: 'menu_click',
        request_id: uuid.v4(),
        user_id: '',
        body: {
            item_id,
            message_id,
            message_subtype,
            message_content,
            channel_id: '',
            context: {},
            arguments: arg || [],
        },
    };
};
const Action = ({ type, channelId, }) => {
    //   const store = getStore();
    return {
        type: 'action',
        request_id: uuid.v4(),
        user_id: '',
        body: {
            subtype: type,
            channel_id: channelId,
            context: {},
        },
    };
};

const socketConfig = /*#__PURE__*/Object.freeze({
    __proto__: null,
    user_login: user_login,
    MsgUp: MsgUp,
    FeatureCall: FeatureCall,
    MenuClick: MenuClick,
    Action: Action
});

const defaultWsOptions = {
    autoReconnect: {
        reconnectMaxCount: 3,
    },
    heartbeat: {
        interval: 10000,
    },
    query: {},
    onMessageEvent: {},
};

const isWebSocketSupported = typeof WebSocket !== 'undefined';
class MSocket {
    constructor(url, option) {
        var _a, _b;
        this.type = 'client';
        this.url = '';
        this._socket = null;
        this.reconnectMaxCount = 3;
        this.heartbeatTime = 6000;
        this.requestCallBackTimeout = 10000;
        this.requestCallbacks = {};
        this.heartbeatTimer = null;
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
            this.close();
            this._socket = yield this.createSocket();
            if (this._socket) {
                this.open();
            }
            this.error();
        });
        this.reconnect = () => __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
        });
        this.heartbeat = () => {
            this.heartbeatTimer = setInterval(() => {
                var _a;
                if (((_a = this._socket) === null || _a === void 0 ? void 0 : _a.readyState) === WebSocket.OPEN) {
                    this._socket.send(JSON.stringify({
                        type: 'heartbeat',
                        request_id: uuid.v4(),
                        body: {},
                    }));
                }
            }, this.heartbeatTime);
        };
        this.onMessage = (event) => {
            console.log('onMessage', event);
        };
        this.createSocket = () => __awaiter(this, void 0, void 0, function* () {
            if (isWebSocketSupported) {
                return new WebSocket(this.url);
            }
            else if (isNodeEnv()) {
                const WebSocket = (yield Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('ws')); })).default;
                return new WebSocket(this.url);
            }
            return null;
        });
        const mergeOption = mergeDeep(defaultWsOptions, option);
        this.url = formatUrl(url, mergeOption === null || mergeOption === void 0 ? void 0 : mergeOption.query);
        this.reconnectMaxCount = ((_a = mergeOption.autoReconnect) === null || _a === void 0 ? void 0 : _a.reconnectMaxCount) || 3;
        this.heartbeatTime = ((_b = mergeOption.heartbeat) === null || _b === void 0 ? void 0 : _b.interval) || 3000;
        this.connect();
    }
    open() {
        this._socket.onopen = () => {
            console.log('onopen');
            this.heartbeat();
        };
    }
    send(data) {
        return new Promise((resolve, reject) => {
            if (!this._socket) {
                reject(new Error('socket is null'));
                return;
            }
            const requestId = data.request_id || uuid.v4();
            let timeoutHandle = null;
            const trySend = () => {
                if (!this._socket) {
                    reject(new Error('socket is null'));
                    return;
                }
                if (this._socket.readyState === this._socket.OPEN) {
                    try {
                        this.requestCallbacks[requestId] = (response) => {
                            clearTimeout(timeoutHandle);
                            resolve(response);
                        };
                        this._socket.send(JSON.stringify(data));
                        timeoutHandle = setTimeout(() => {
                            delete this.requestCallbacks[requestId];
                            reject(new Error('request timeout'));
                        }, this.requestCallBackTimeout);
                    }
                    catch (error) {
                        reject(error); // 发送过程中出现错误
                    }
                }
                else if ([this._socket.CLOSING, this._socket.CLOSED].includes(this._socket.readyState)) {
                    this.reconnect()
                        .then(() => {
                        setTimeout(trySend, 1000);
                    })
                        .catch(reject);
                }
                else if (this._socket.readyState === this._socket.CONNECTING) {
                    setTimeout(trySend, 1000);
                }
            };
            trySend();
        });
    }
    error() {
        this._socket.onerror = (event) => {
            console.log('onerror', event);
        };
    }
    close() {
        var _a;
        (_a = this._socket) === null || _a === void 0 ? void 0 : _a.close();
        clearInterval(this.heartbeatTimer);
        this._socket = null;
    }
}
function createSocket(url, option) {
    return new MSocket(url, option);
}

function dispatchHttpRequest() {
    const self = this;
    self.socket = createSocket(this.config.wsUrl, {
        onMessageEvent: {},
    });
    self.send = (type, data) => __awaiter(this, void 0, void 0, function* () {
        const typeName = Object.keys(socketConfig);
        if (!typeName.includes(type)) {
            throw new Error(`${type}: type is not exist`);
        }
        if (type === 'user_login') {
            const config = socketConfig[type];
            // console.log('send', config());
            self.socket.send(config());
        }
        else {
            console.log('type:::', type);
        }
    });
    // console.log(socketConfig);
}

class MoobiusSDK {
    constructor(instanceConfig) {
        this.defaults = instanceConfig;
        this.config = instanceConfig;
    }
    init(config) {
        this.config = mergeDeep(this.defaults, config);
        dispatchHttpRequest$1.call(this);
        dispatchHttpRequest.call(this);
        return this;
    }
}

function createInstance(defaultConfig) {
    const context = new MoobiusSDK(defaultConfig);
    const instance = bind(MoobiusSDK.prototype.init, context);
    extend(instance, MoobiusSDK.prototype, context, { allOwnKeys: true });
    extend(instance, context, null, { allOwnKeys: true });
    console.log('instance', instance);
    return instance;
}
const defaults = {
    httpUrl: 'https://api.moobius.net',
    wsUrl: 'wss://ws.moobius.net',
};
const moobiusSDk = createInstance(defaults);

module.exports = moobiusSDk;
//# sourceMappingURL=moobius.cjs.map
