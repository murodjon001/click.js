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

    private merchant_trans_id!: string; // merchant_trans_id
    private service_id!: string;
    private user_id!: string;
    private secret_key!: string;

    private click_trans_id!: number;
    private click_paydoc_id!: number;
    private amount!: number;
    private action: number = 0
    private error: number = 0
    private error_note!: string;
    private sign_time: string = new Date().toString()
    private sign_string!: string;

    public setConnectionKeys(params: IShoppingApiParams): void {
        this.merchant_trans_id = params.merchant_trans_id;
        this.service_id = params.service_id;
        this.user_id = params.user_id;
        this.secret_key = params.secret_key
    }

    async prepare(params: IPrepareApiParams): Promise<IPrepareApiResponse> {
        this.validateCredentials()
        this.signString = params
        this.otherProperties = params

        try{
            const res = await this.clickRequest.post(PREPARE_URL, {
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
            })

            return res.data;
        }catch(err){
            console.error(err)
            throw new Error("Error while prepare")
        }
    }

    async complete(params: ICompleteApiParams): Promise<ICompleteApiResponse> {
        try{
            const res = await this.clickRequest.post(COMPLETE_URL, {
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
            })

            return res.data;
        }catch(err){
            console.error(err)
            throw new Error("Error while prepare")
        }
    }

    /**
     * Sets amount, click_trans_id and click_paydoc_id properties
     * @private
     * @param {IPrepareApiParams} 
     */

    private set otherProperties(params: IPrepareApiParams){
        this.amount = params.amount
        this.click_trans_id = params.click_trans_id
        this.click_paydoc_id = params.click_paydoc_id
    }

    /**
     * Sets sign_string property
     * @private
     * @param {IPrepareApiParams} 
     */

    private set signString(params: IPrepareApiParams){
        const data =  
        params.click_trans_id + 
        this.service_id + 
        this.secret_key + 
        this.merchant_trans_id + 
        params.amount + 
        this.action + 
        this.sign_time
           
        

        this.sign_string = sha1(data).toString()
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
        const timestampHash = md5(String(this.timestamp)).toString()
        const secretKeyHash = md5(this.secret_key).toString()

        return `${this.user_id}:${timestampHash}${secretKeyHash}:${this.timestamp}`
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

        if (!this.user_id) {
            throw new Error("user_id is required");
        }

        this.clickRequest
    }

}