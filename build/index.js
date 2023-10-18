"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mkError = exports.Creditsafe = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var path_1 = __importDefault(require("path"));
var camelcase_keys_1 = __importDefault(require("camelcase-keys"));
var authentication_1 = require("./authentication");
var company_1 = require("./company");
var people_1 = require("./people");
var ClientVersion = require('../package.json').version;
var PROTOCOL = 'https';
var CREDITSAFE_HOST = 'connect.creditsafe.com/v1';
/*
 * This is the main constructor of the Creditsafe Client, and will be called
 * with something like:
 *
 *   import { Creditsafe } from "creditsafe-node-client"
 *   const client = new Creditsafe('me@myplace.com', 'pickle')
 */
var Creditsafe = /** @class */ (function () {
    function Creditsafe(username, password, options) {
        this.host = (options === null || options === void 0 ? void 0 : options.host) || CREDITSAFE_HOST;
        this.username = (options === null || options === void 0 ? void 0 : options.username) || username;
        this.password = (options === null || options === void 0 ? void 0 : options.password) || password;
        // now construct all the specific domain objects
        this.authentication = new authentication_1.AuthenticationApi(this, options);
        this.company = new company_1.CompanyApi(this, options);
        this.people = new people_1.PeopleApi(this, options);
    }
    /*
     * Function to fire off a GET, PUT, POST, (method) to the uri, preceeded
     * by the host, with the optional query params, and optional body, and
     * puts the 'apiKey' into the headers for the call, and fires off the call
     * to the PostGrid host and returns the response.
     */
    Creditsafe.prototype.fire = function (method, uri, query, body) {
        return __awaiter(this, void 0, void 0, function () {
            var url, isForm, headers, response, cnt, auth, payload, _a, auth, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = new URL(PROTOCOL + '://' + path_1.default.join(this.host, uri));
                        if (query) {
                            Object.keys(query).forEach(function (k) {
                                if (something(query[k])) {
                                    url.searchParams.append(k, query[k].toString());
                                }
                            });
                        }
                        isForm = isFormData(body);
                        headers = {
                            Accept: 'application/json',
                            'X-Creditsafe-Client-Ver': ClientVersion,
                        };
                        if (!isForm) {
                            headers = __assign(__assign({}, headers), { 'Content-Type': 'application/json' });
                        }
                        cnt = 0;
                        _b.label = 1;
                    case 1:
                        if (!(cnt < 3)) return [3 /*break*/, 10];
                        if (!(uri !== 'authenticate' || method !== 'POST')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.authentication.checkToken()];
                    case 2:
                        auth = _b.sent();
                        if (!(auth === null || auth === void 0 ? void 0 : auth.success)) {
                            return [2 /*return*/, { response: { payload: auth } }];
                        }
                        headers = __assign(__assign({}, headers), { 'Authorization': this.authentication.token });
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 8, , 9]);
                        return [4 /*yield*/, (0, node_fetch_1.default)(url, {
                                method: method,
                                body: isForm ? body : (body ? JSON.stringify(body) : undefined),
                                headers: headers,
                            })];
                    case 4:
                        response = _b.sent();
                        _a = camelcase_keys_1.default;
                        return [4 /*yield*/, (response === null || response === void 0 ? void 0 : response.json())];
                    case 5:
                        payload = _a.apply(void 0, [(_b.sent()), { deep: true }]);
                        if (!(response.status == 401 && (payload === null || payload === void 0 ? void 0 : payload.error) === 'Invalid token.')) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.authentication.resetToken()];
                    case 6:
                        auth = _b.sent();
                        if (!(auth === null || auth === void 0 ? void 0 : auth.success)) {
                            return [2 /*return*/, { response: __assign(__assign({}, response), { payload: auth }) }];
                        }
                        // ...and try it all again... :)
                        return [3 /*break*/, 9];
                    case 7: return [2 /*return*/, { response: response, payload: payload }];
                    case 8:
                        err_1 = _b.sent();
                        return [2 /*return*/, { response: response }];
                    case 9:
                        cnt++;
                        return [3 /*break*/, 1];
                    case 10: 
                    // this will mean we retried, and still failed
                    return [2 /*return*/, { response: response }];
                }
            });
        });
    };
    return Creditsafe;
}());
exports.Creditsafe = Creditsafe;
/*
 * Simple function used to weed out undefined and null query params before
 * trying to place them on the call.
 */
function something(arg) {
    return arg || arg === false || arg === 0 || arg === '';
}
/*
 * Simple predicate function to return 'true' if the argument is a FormData
 * object - as that is one of the possible values of the 'body' in the fire()
 * function. We have to handle that differently on the call than when it's
 * a more traditional JSON object body.
 */
function isFormData(arg) {
    var ans = false;
    if (arg && typeof arg === 'object') {
        ans = (typeof arg._boundary === 'string' &&
            arg._boundary.length > 20 &&
            Array.isArray(arg._streams));
    }
    return ans;
}
/*
 * Convenience function to create a CreditsafeError based on a simple message
 * from the Client code. This is an easy way to make CreditsafeError instances
 * from the simple error messages we have in this code.
 */
function mkError(message) {
    return {
        type: 'client',
        message: message,
    };
}
exports.mkError = mkError;
