interface ICompleteApiParams {
    merchant_prepare_id: number
    
}

declare class ICompleteApiResponse {
    click_trans_id: number
    merchant_trans_id: string
    merchant_confirm_id: number
    error: number
    error_note: string
}

interface IPrepareApiParams {
    click_trans_id: number 
    click_paydoc_id: number
    amount: number
}

interface IPrepareApiResponse {
    click_trans_id: number
    merchant_trans_id: string
    merchant_prepare_id: number
    error: number
    error_note: string
}

interface IConnectionKeysParams {
    merchant_trans_id: string;
    service_id: string;
    user_id: string;
    secret_key: string
}

interface IShoppingApi {
    setConnectionKeys(params: IConnectionKeysParams): void
    prepare(params: IPrepareApiParams): Promise<IPrepareApiResponse> 
    complete(params: ICompleteApiParams): Promise<ICompleteApiResponse>
}

declare class ShoppingApi implements IShoppingApi {
    private clickApiUrl;
    private merchant_trans_id;
    private service_id;
    private user_id;
    private secret_key;
    private click_trans_id;
    private click_paydoc_id;
    private amount;
    private action;
    private error;
    private error_note;
    private sign_time;
    private sign_string;
    setConnectionKeys(params: IConnectionKeysParams): void;
    prepare(params: IPrepareApiParams): Promise<IPrepareApiResponse>;
    complete(params: ICompleteApiParams): Promise<ICompleteApiResponse>;
    /**
     * Sets amount, click_trans_id and click_paydoc_id properties
     * @private
     * @param {IPrepareApiParams}
     */
    private set otherProperties(value);
    /**
     * Sets sign_string property
     * @private
     * @param {IPrepareApiParams}
     */
    private set signString(value);
    /**
     * Gets request for click service
     * @private
     * @returns {AxiosInstance}
     */
    private get clickRequest();
    /**
     * Gets authorization token
     * @returns {string}
     * @private
     */
    private get authorization();
    /**
     * Gets the current Unix timestamp in seconds.
     * @private
     * @returns {number} The current Unix timestamp in seconds.
     */
    private get timestamp();
    private validateCredentials;
}

type TPaymentApi = 'shopping_api' // other api

declare class ClickClient {
    static create(type: TPaymentApi): ShoppingApi;
}

export { ClickClient };
