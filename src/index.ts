import { ShoppingApi } from "./api-types/shopping-api";
import { TPaymentApi } from "./utils/types/payment-api.type";

export class ClickClient {
    static create(type: TPaymentApi){
        if(type === 'shopping_api'){
            return new ShoppingApi()
        }
        // other types
        else {
            throw new Error('Invalid API type');
        }
    }
}