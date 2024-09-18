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

// src/constants/api-url.ts
var CLICK_API_URL = "https://api.click.uz/v2/merchant/";
var CREATED_INVOICE = CLICK_API_URL + "invoice/create";
var CHECKED_STATUS_INVOICE = CLICK_API_URL + "invoice/status/";
var CHECKED_STATUS_PAYMENT = CLICK_API_URL + "payment/status/";
var CHECKED_STATUS_BY_MERCHANT_TRANS_ID = CLICK_API_URL + "payment/status_by_mti/";
var REFUNDED_PARTIAL = CLICK_API_URL + "payment/partial_reversal/";
var CANCELLED_PAYMENT = CLICK_API_URL + "payment/reversal/";
var CREATED_TOKEN = CLICK_API_URL + "card_token/request";
var VERIFICATED_TOKEN = CLICK_API_URL + "card_token/verify";
var PAYED_BY_TOKEN = CLICK_API_URL + "card_token/payment";
var DELETED_TOKEN = CLICK_API_URL + "card_token/";

// src/api-types/merchant-api.ts
import axios from "axios";
import sha1 from "crypto-js/sha1";
var MerchantApi = class {
  setConnectionKeys(params) {
    this.merchant_id = params.merchant_id;
    this.secret_key = params.secret_key;
    this.user_id = params.user_id;
    this.service_id = params.service_id;
  }
  createInvoice(params) {
    return __async(this, null, function* () {
      this.validateCredentials();
      try {
        const res = yield this.clickRequest.post(CREATED_INVOICE, {
          service_id: params.service_id,
          amount: params.amount,
          phone_number: params.phone_number,
          merchant_trans_id: params.merchant_trans_id
        });
        return res.data;
      } catch (err) {
        throw new Error(`Error while create invoice "${err}"`);
      }
    });
  }
  checkPaymentStatusByMerchantTransId(params) {
    return __async(this, null, function* () {
      this.validateCredentials();
      try {
        const res = yield this.clickRequest.get(
          CHECKED_STATUS_BY_MERCHANT_TRANS_ID + params.service_id + "/" + params.merchant_trans_id + "/" + params.YYYY_MM_DD
        );
        return res.data;
      } catch (err) {
        throw new Error(`Error while check payment status by merchant id "${err}"`);
      }
    });
  }
  checkInvoiceStatus(params) {
    return __async(this, null, function* () {
      this.validateCredentials();
      try {
        const res = yield this.clickRequest.get(
          CHECKED_STATUS_INVOICE + params.service_id + "/" + params.invoice_id
        );
        return res.data;
      } catch (err) {
        throw new Error(`Error while check invoice status "${err}"`);
      }
    });
  }
  checkPaymentStatus(params) {
    return __async(this, null, function* () {
      this.validateCredentials();
      try {
        const res = yield this.clickRequest.get(
          CHECKED_STATUS_PAYMENT + params.service_id + "/" + params.payment_id
        );
        return res.data;
      } catch (err) {
        throw new Error(`Error while check status payment "${err}"`);
      }
    });
  }
  cancellationPayment(params) {
    return __async(this, null, function* () {
      this.validateCredentials();
      try {
        const res = yield this.clickRequest.delete(CANCELLED_PAYMENT + "/" + params.service_id + "/" + params.payment_id);
        return res.data;
      } catch (err) {
        throw new Error(`Error while cancellation payment "${err}"`);
      }
    });
  }
  refundPartial(params) {
    return __async(this, null, function* () {
      this.validateCredentials();
      try {
        const res = yield this.clickRequest.delete(REFUNDED_PARTIAL + "/" + params.service_id + "/" + params.payment_id + "/" + params.amount);
        return res.data;
      } catch (err) {
        throw new Error(`Error while refundPartial "${err}"`);
      }
    });
  }
  createTokenCard(params) {
    return __async(this, null, function* () {
      this.validateCredentials();
      try {
        const res = yield this.clickRequest.post(CREATED_TOKEN, {
          service_id: params.service_id,
          card_number: params.card_number,
          expire_date: params.expire_date,
          temporary: params.temporary
        });
        return res.data;
      } catch (err) {
        throw new Error(`Error while createTokenCard "${err}"`);
      }
    });
  }
  verificationTokenCard(params) {
    return __async(this, null, function* () {
      this.validateCredentials();
      try {
        const res = yield this.clickRequest.post(VERIFICATED_TOKEN, {
          service_id: params.service_id,
          card_token: params.card_token,
          sms_code: params.sms_code
        });
        return res.data;
      } catch (err) {
        throw new Error(`Error while verification token "${err}"`);
      }
    });
  }
  payWithToken(params) {
    return __async(this, null, function* () {
      this.validateCredentials();
      try {
        const res = yield this.clickRequest.post(PAYED_BY_TOKEN, {
          card_token: params.card_token,
          amount: params.amount,
          merchant_trans_id: params.merchant_trans_id
        });
        return res.data;
      } catch (err) {
        throw new Error(`Error while pay with token payment "${err}"`);
      }
    });
  }
  deleteTokenCard(params) {
    return __async(this, null, function* () {
      this.validateCredentials();
      try {
        const res = yield this.clickRequest.delete(DELETED_TOKEN + params.service_id + "/" + params.card_token);
        return res.data;
      } catch (err) {
        throw new Error(`Error while pay with token payment "${err}"`);
      }
    });
  }
  //make transfer merchant api
  /**
   * Gets request for click service
   * @private
   * @returns {AxiosInstance}
   */
  get clickRequest() {
    return axios.create({
      baseURL: CLICK_API_URL,
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
    const timestampHashAndSecretKeyHash = sha1(String(this.timestamp) + this.secret_key).toString();
    return `${this.user_id}:${timestampHashAndSecretKeyHash}:${this.timestamp}`;
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
  }
};

// src/api-types/shopping-api.ts
import md5 from "crypto-js/md5";

// src/utils/error-exeptions/error.exception.ts
var ErrorException = class {
  constructor(error) {
    this.checkError(error);
  }
  checkError(error) {
    switch (error) {
      case 0:
        return;
      case -1:
        throw new Error("SIGN CHECK FAILED");
      case -2:
        throw new Error("Incorrect parameter amount");
      case -3:
        throw new Error("Action not found");
      case -4:
        throw new Error("Already paid");
      case -5:
        throw new Error("User does not exist");
      case -6:
        throw new Error("Transaction does not exist");
      case -7:
        throw new Error("Failed to update user");
      case -8:
        throw new Error("Error in request from click");
      case -9:
        throw new Error("Transaction cancelled");
    }
  }
};

// src/utils/generate-random-number.ts
function getRandomNumber() {
  return Math.floor(Math.random() * 1e4) + 1;
}

// src/api-types/shopping-api.ts
var ShoppingApi = class {
  setConnectionKeys(params) {
    this.merchant_id = params.merchant_id;
    this.secret_key = params.secret_key;
    this.user_id = params.user_id;
    this.service_id = params.service_id;
  }
  prepare(params) {
    return __async(this, null, function* () {
      this.validateCredentials();
      this.signStringForPrepare = params;
      this.checkSignString(params.sign_string);
      this.checkError(params);
      try {
        return {
          click_trans_id: params.click_trans_id,
          merchant_trans_id: params.merchant_trans_id,
          error: params.error,
          error_note: params.error_note,
          sign_string: params.sign_string,
          sign_time: params.sign_time,
          merchant_prepare_id: getRandomNumber()
        };
      } catch (err) {
        console.error(err);
        throw new Error("Error while prepare");
      }
    });
  }
  complete(params) {
    return __async(this, null, function* () {
      this.signStringForComplete = params;
      this.checkError(params);
      try {
        return {
          click_trans_id: params.click_trans_id,
          merchant_trans_id: params.merchant_trans_id,
          error: params.error,
          error_note: params.error_note,
          merchant_confirm_id: getRandomNumber()
        };
      } catch (err) {
        console.error(err);
        throw new Error("Error while prepare");
      }
    });
  }
  checkSignString(signString) {
    if (signString !== this.sign_string) {
      throw new Error("Sign string is not valid");
    }
  }
  checkError(params) {
    return new ErrorException(params.error);
  }
  /**
   * Sets sign_string property
   * @private
   * @param {IPrepareApiParams} 
   */
  set signStringForPrepare(params) {
    const data = params.click_trans_id + this.service_id + this.secret_key + params.merchant_trans_id + params.amount + params.action + params.sign_time;
    this.sign_string = md5(data).toString();
  }
  set signStringForComplete(params) {
    const data = params.click_trans_id + this.service_id + this.secret_key + params.merchant_trans_id + params.merchant_prepare_id + params.amount + params.action + params.sign_time;
    this.sign_string = md5(data).toString();
  }
  validateCredentials() {
    if (!this.secret_key) {
      throw new Error("secret key is required");
    }
  }
};

// src/index.ts
var ClickClient = class {
  static create(type) {
    if (type === "shopping") {
      return new ShoppingApi();
    }
    if (type === "merchant") {
      return new MerchantApi();
    } else {
      throw new Error("Invalid API type");
    }
  }
};
export {
  ClickClient
};
//# sourceMappingURL=index.mjs.map