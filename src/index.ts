import { MerchantApi } from "./api-types/merchant-api";
import { ShoppingApi } from "./api-types/shopping-api";
import { TPaymentApi } from "./utils/types/payment-api.type";

export class ClickClient {
    static create<T extends TPaymentApi>(type: T): T extends 'merchant' ? MerchantApi : ShoppingApi {
        if(type === 'shopping'){
            return new ShoppingApi() as T extends 'merchant' ? MerchantApi : ShoppingApi
        }
        if(type === 'merchant'){
            return new MerchantApi() as T extends 'merchant' ? MerchantApi : ShoppingApi
        }
        else {
            throw new Error('Invalid API type');
        }
    }
}