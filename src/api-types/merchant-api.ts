import { 
    CANCELLED_PAYMENT, 
    CHECKED_STATUS_BY_MERCHANT_TRANS_ID, 
    CHECKED_STATUS_INVOICE, 
    CHECKED_STATUS_PAYMENT, 
    CLICK_API_URL, 
    CREATED_INVOICE, 
    CREATED_TOKEN, 
    DELETED_TOKEN, 
    PAYED_BY_TOKEN, 
    REFUNDED_PARTIAL, 
    VERIFICATED_TOKEN 
} from "../constants/api-url";
import { 
    ICancellationPaymentParams, 
    ICancellationPaymentResponse, 
    ICheckInvoiceStatusParams, 
    ICheckInvoiceStatusResponse, 
    ICheckPaymentStatusByMerchantTransId, 
    ICheckPaymentStatusByMerchantTransIdResponse, 
    ICheckPaymentStatusParams, 
    ICheckPaymentStatusResponse, 
    ICreateInvoiceParams, 
    ICreateInvoiceResponse, 
    ICreateTokenCardParams, 
    ICreateTokenCardResponse, 
    IDeleteTokenCardParams, 
    IDeleteTokenCardResponse, 
    IMerchantApi, 
    IPayWithTokenParams, 
    IPayWithTokenResponse, 
    IRefoundPartialParams, 
    IRefoundPartialResponse, 
    IVerificationTokenCardParams, 
    IVerificationTokenCardResponse 
} from "../interfaces/merchant-api.interface";
import { IConnectionKeysParams } from "../interfaces/connection-keys-params.interface";
import axios, { AxiosInstance } from 'axios';
import sha1 from "crypto-js/sha1";

export class MerchantApi implements IMerchantApi {
    private secret_key!: string;
    private merchant_id!: number;
    private service_id!: number;
    private user_id!: number;

    public setConnectionKeys(params: IConnectionKeysParams): void {
        this.merchant_id = params.merchant_id
        this.secret_key = params.secret_key
        this.user_id = params.user_id
        this.service_id = params.service_id
    }

    public async createInvoice(params: ICreateInvoiceParams): Promise<ICreateInvoiceResponse> {
        this.validateCredentials()
        try {
        const res = await this.clickRequest.post(CREATED_INVOICE, {
              service_id: params.service_id,
              amount: params.amount,
              phone_number: params.phone_number,
              merchant_trans_id: params.merchant_trans_id
        });

        return res.data;
    }catch(err){
        throw new Error(`Error while create invoice "${err}"`)
    }
    }

    public async checkPaymentStatusByMerchantTransId(params: ICheckPaymentStatusByMerchantTransId): Promise<ICheckPaymentStatusByMerchantTransIdResponse> {
        this.validateCredentials()

        try{
            const res = await this.clickRequest.get(
                CHECKED_STATUS_BY_MERCHANT_TRANS_ID + 
                params.service_id + 
                '/' + 
                params.merchant_trans_id + 
                '/' + 
                params.YYYY_MM_DD,
             )

             return res.data
        }catch(err){
            throw new Error(`Error while check payment status by merchant id "${err}"`)
        }
    }

    public async checkInvoiceStatus(params: ICheckInvoiceStatusParams): Promise<ICheckInvoiceStatusResponse> {
        this.validateCredentials()

        try{
            const res = await this.clickRequest.get(
                CHECKED_STATUS_INVOICE + 
                params.service_id + 
                '/' + 
                params.invoice_id
             )

             return res.data
        }catch(err){
            throw new Error(`Error while check invoice status "${err}"`)
        }
    }

    public async checkPaymentStatus(params: ICheckPaymentStatusParams): Promise<ICheckPaymentStatusResponse> {
        this.validateCredentials()

        try{
            const res = await this.clickRequest.get(
                CHECKED_STATUS_PAYMENT + 
                params.service_id + 
                '/' + 
                params.payment_id
             )

             return res.data
        }catch(err){
            throw new Error(`Error while check status payment "${err}"`)
        }
    }

    public async cancellationPayment(params: ICancellationPaymentParams): Promise<ICancellationPaymentResponse> {
        this.validateCredentials()

        try{
            const res = await this.clickRequest.delete(CANCELLED_PAYMENT + '/' + params.service_id + '/' + params.payment_id)

            return res.data
        }catch(err){
            throw new Error(`Error while cancellation payment "${err}"`)
        }
    }

    public async refundPartial(params: IRefoundPartialParams): Promise<IRefoundPartialResponse> {
        this.validateCredentials()

        try{
            const res = await this.clickRequest.delete(REFUNDED_PARTIAL + '/' + params.service_id + '/' + params.payment_id + '/' + params.amount)

            return res.data
        }catch(err){
            throw new Error(`Error while refundPartial "${err}"`)
        }
    }

    public async createTokenCard(params: ICreateTokenCardParams): Promise<ICreateTokenCardResponse> {
        this.validateCredentials()

        try{
            const res = await this.clickRequest.post(CREATED_TOKEN, {
                service_id: params.service_id,
                card_number: params.card_number,
                expire_date: params.expire_date,
                temporary: params.temporary
            })

            return res.data
        }catch(err){
            throw new Error(`Error while createTokenCard "${err}"`)
        }
    }

    public async verificationTokenCard(params: IVerificationTokenCardParams): Promise<IVerificationTokenCardResponse> {
        this.validateCredentials()

        try{
            const res = await this.clickRequest.post(VERIFICATED_TOKEN, {
                service_id: params.service_id,
                card_token: params.card_token,
                sms_code: params.sms_code,
            })

            return res.data
        }catch(err){
            throw new Error(`Error while verification token "${err}"`)
        }
    }

    public async payWithToken(params: IPayWithTokenParams): Promise<IPayWithTokenResponse> {
        this.validateCredentials()

        try{
            const res = await this.clickRequest.post(PAYED_BY_TOKEN, {
                card_token: params.card_token,
                amount: params.amount,
                merchant_trans_id: params.merchant_trans_id,
            })

            return res.data
        }catch(err){
            throw new Error(`Error while pay with token payment "${err}"`)
        }
    }

    public async deleteTokenCard(params: IDeleteTokenCardParams): Promise<IDeleteTokenCardResponse> {
        this.validateCredentials()

        try{
            const res = await this.clickRequest.delete(DELETED_TOKEN + params.service_id + '/' + params.card_token)

            return res.data
        }catch(err){
            throw new Error(`Error while pay with token payment "${err}"`)
        }
    }

    //make transfer merchant api
    /**
     * Gets request for click service
     * @private
     * @returns {AxiosInstance}
     */
    private get clickRequest(): AxiosInstance {
        return axios.create({
            baseURL: CLICK_API_URL,
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
    }
}