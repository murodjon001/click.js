"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ClickClient: () => ClickClient
});
module.exports = __toCommonJS(src_exports);

// src/api-types/shopping-api.ts
var import_axios = __toESM(require("axios"));
var import_sha1 = __toESM(require("crypto-js/sha1"));
var import_md5 = __toESM(require("crypto-js/md5"));

// src/constants/api-url.ts
var API_URL = "https://api.click.uz/v2/merchant/";
var PREPARE_URL = API_URL + "/prepare";
var COMPLETE_URL = API_URL + "/complete";

// src/api-types/shopping-api.ts
var ShoppingApi = class {
  constructor() {
    this.clickApiUrl = API_URL;
    this.action = 0;
    this.error = 0;
    this.sign_time = (/* @__PURE__ */ new Date()).toString();
  }
  setConnectionKeys(params) {
    this.merchant_trans_id = params.merchant_trans_id;
    this.service_id = params.service_id;
    this.user_id = params.user_id;
    this.secret_key = params.secret_key;
  }
  prepare(params) {
    return __async(this, null, function* () {
      this.validateCredentials();
      this.signString = params;
      this.otherProperties = params;
      try {
        const res = yield this.clickRequest.post(PREPARE_URL, {
          click_trans_id: params.click_trans_id,
          click_paydoc_id: params.click_paydoc_id,
          amount: params.amount,
          service_id: this.service_id,
          merchant_trans_id: this.merchant_trans_id,
          action: this.action,
          error: this.error,
          error_note: this.error_note,
          sign_time: this.sign_time,
          sign_string: this.sign_string
        });
        return res.data;
      } catch (err) {
        console.error(err);
        throw new Error("Error while prepare");
      }
    });
  }
  complete(params) {
    return __async(this, null, function* () {
      try {
        const res = yield this.clickRequest.post(COMPLETE_URL, {
          merchant_prepare_id: params.merchant_prepare_id,
          click_trans_id: this.click_trans_id,
          click_paydoc_id: this.click_paydoc_id,
          amount: this.amount,
          service_id: this.service_id,
          merchant_trans_id: this.merchant_trans_id,
          action: this.action,
          error: this.error,
          error_note: this.error_note,
          sign_time: this.sign_time,
          sign_string: this.sign_string
        });
        return res.data;
      } catch (err) {
        console.error(err);
        throw new Error("Error while prepare");
      }
    });
  }
  /**
   * Sets amount, click_trans_id and click_paydoc_id properties
   * @private
   * @param {IPrepareApiParams} 
   */
  set otherProperties(params) {
    this.amount = params.amount;
    this.click_trans_id = params.click_trans_id;
    this.click_paydoc_id = params.click_paydoc_id;
  }
  /**
   * Sets sign_string property
   * @private
   * @param {IPrepareApiParams} 
   */
  set signString(params) {
    const data = params.click_trans_id + this.service_id + this.secret_key + this.merchant_trans_id + params.amount + this.action + this.sign_time;
    this.sign_string = (0, import_sha1.default)(data).toString();
  }
  /**
   * Gets request for click service
   * @private
   * @returns {AxiosInstance}
   */
  get clickRequest() {
    return import_axios.default.create({
      baseURL: this.clickApiUrl,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Auth": this.authorization
      }
    });
  }
  /**
   * Gets authorization token
   * @returns {string} 
   * @private
   */
  get authorization() {
    const timestampHash = (0, import_md5.default)(String(this.timestamp)).toString();
    const secretKeyHash = (0, import_md5.default)(this.secret_key).toString();
    return `${this.user_id}:${timestampHash}${secretKeyHash}:${this.timestamp}`;
  }
  /**
   * Gets the current Unix timestamp in seconds.
   * @private
   * @returns {number} The current Unix timestamp in seconds.
   */
  get timestamp() {
    return Math.floor(Date.now() / 1e3);
  }
  validateCredentials() {
    if (!this.secret_key) {
      throw new Error("secret key is required");
    }
    if (!this.user_id) {
      throw new Error("user_id is required");
    }
    this.clickRequest;
  }
};

// src/index.ts
var ClickClient = class {
  static create(type) {
    if (type === "shopping_api") {
      return new ShoppingApi();
    } else {
      throw new Error("Invalid API type");
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClickClient
});
//# sourceMappingURL=index.js.map