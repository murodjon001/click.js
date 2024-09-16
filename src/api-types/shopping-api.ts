import axios, { AxiosInstance } from 'axios';
import sha1 from "crypto-js/sha1";
import md5 from "crypto-js/md5";
import { API_URL, COMPLETE_URL, PREPARE_URL } from "../constants/api-url";
import { IShoppingApi } from "../interfaces/shopping-api.interface";
import { IShoppingApiParams } from '../interfaces/shopping-api-params.interface';
import { IPrepareApiParams } from '../interfaces/prepare-api-params.interface';
import { IPrepareApiResponse } from '../interfaces/prepare-api-response.interface';
import { ICompleteApiParams } from '../interfaces/complete-api-params.interface';
import { ICompleteApiResponse } from '../interfaces/complete-api-response.interface';

export class ShoppingApi implements IShoppingApi {
    private clickApiUrl = API_URL;

    private secret_key!: string;
    private merchant_id!: number;
    private service_id!: number;
    private user_id!: number;

    private sign_string!: string;

    public setConnectionKeys(params: IShoppingApiParams): void {
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
            const res = await this.clickRequest.post(PREPARE_URL, {
                click_trans_id: params.click_trans_id,
                click_paydoc_id: params.click_paydoc_id,
                amount: params.amount,
                service_id: params.service_id,
                merchant_trans_id: params.merchant_trans_id,
                action: params.action,
                error: params.error,
                error_note: params.error_note,
                sign_time: params.sign_time,
                sign_string: params.sign_string
            })

            return res.data;
        }catch(err){
            console.error(err)
            throw new Error("Error while prepare")
        }
    }

    async complete(params: ICompleteApiParams): Promise<ICompleteApiResponse> {
        this.signStringForComplete = params
        this.checkError(params)

        try{
            const res = await this.clickRequest.post(COMPLETE_URL, {
                merchant_prepare_id: params.merchant_prepare_id,
                click_trans_id: params.click_trans_id,
                click_paydoc_id: params.click_paydoc_id,
                amount: params.amount,
                service_id: params.service_id,
                merchant_trans_id: params.merchant_trans_id,
                action: params.action,
                error: params.error,
                error_note: params.error_note,
                sign_time: params.sign_time,
                sign_string: params.sign_string
            })

            return res.data;
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
        if(params.error < 0){
            throw new Error(params.error_note);
        }
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

    /**
     * Gets request for click service
     * @private
     * @returns {AxiosInstance}
     */
    private get clickRequest(): AxiosInstance {
        return axios.create({
            baseURL: this.clickApiUrl,
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Auth': this.authorization,
            }
        })
    }


    /**
     * Gets authorization token
     * @returns {string} 
     * @private
     */
    private get authorization (): string{
        const timestampHashAndSecretKeyHash = sha1(String(this.timestamp) + this.secret_key).toString()

        return `${this.user_id}:${timestampHashAndSecretKeyHash}:${this.timestamp}`
    }


    /**
     * Gets the current Unix timestamp in seconds.
     * @private
     * @returns {number} The current Unix timestamp in seconds.
     */
    private get timestamp (): number{
        return Math.floor(Date.now() / 1000);
    }

    private validateCredentials(): void {
        if (!this.secret_key) {
            throw new Error("secret key is required");
        }

        this.clickRequest
    }

}