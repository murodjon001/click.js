import md5 from "crypto-js/md5";
import { IShoppingApi } from "../interfaces/shopping-api.interface";
import { IConnectionKeysParams } from '../interfaces/connection-keys-params.interface';
import { IPrepareApiParams } from '../interfaces/prepare-api-params.interface';
import { IPrepareApiResponse } from '../interfaces/prepare-api-response.interface';
import { ICompleteApiParams } from '../interfaces/complete-api-params.interface';
import { ICompleteApiResponse } from '../interfaces/complete-api-response.interface';
import { ErrorException } from '../utils/error-exeptions/error.exception';
import { getRandomNumber } from '../utils/generate-random-number';

export class ShoppingApi implements IShoppingApi {
    private secret_key!: string;
    private merchant_id!: number;
    private service_id!: number;
    private user_id!: number;

    private sign_string!: string;

    public setConnectionKeys(params: IConnectionKeysParams): void {
        this.merchant_id = params.merchant_id
        this.secret_key = params.secret_key
        this.user_id = params.user_id
        this.service_id = params.service_id
    }

    async prepare(params: IPrepareApiParams): Promise<IPrepareApiResponse> {
        this.validateCredentials()
        this.signStringForPrepare = params
        this.checkSignString(params.sign_string)
        this.checkError(params)
        
        try{
            return {
                click_trans_id: params.click_trans_id,
                merchant_trans_id: params.merchant_trans_id,
                error: params.error,
                error_note: params.error_note,
                sign_string: params.sign_string,
                sign_time: params.sign_time,
                merchant_prepare_id: getRandomNumber()
            }
        }catch(err){
            console.error(err)
            throw new Error("Error while prepare")
        }
    }

    async complete(params: ICompleteApiParams): Promise<ICompleteApiResponse> {
        this.signStringForComplete = params
        this.checkError(params)

        try{
           return {
                click_trans_id: params.click_trans_id,
                merchant_trans_id: params.merchant_trans_id,
                error: params.error,
                error_note: params.error_note,
                merchant_confirm_id: getRandomNumber()
            }

        }catch(err){
            console.error(err)
            throw new Error("Error while prepare")
        }
    }

    private checkSignString(signString: string): void {
        if (signString !== this.sign_string){
            throw new Error("Sign string is not valid");
        }
    }

    private checkError(params: IPrepareApiParams | ICompleteApiParams){
        return new ErrorException(params.error);
    }

    /**
     * Sets sign_string property
     * @private
     * @param {IPrepareApiParams} 
     */

    private set signStringForPrepare(params: IPrepareApiParams){
        const data =  
        params.click_trans_id + 
        this.service_id + 
        this.secret_key + 
        params.merchant_trans_id + 
        params.amount + 
        params.action + 
        params.sign_time
           
        this.sign_string = md5(data).toString()
    }

    private set signStringForComplete(params: ICompleteApiParams){
        const data =  
        params.click_trans_id + 
        this.service_id + 
        this.secret_key + 
        params.merchant_trans_id + 
        params.merchant_prepare_id +
        params.amount + 
        params.action + 
        params.sign_time
           
        this.sign_string = md5(data).toString()
    }

    private validateCredentials(): void {
        if (!this.secret_key) {
            throw new Error("secret key is required");
        }
    }
}