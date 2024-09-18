interface IMerchantApi{
    setConnectionKeys(params: IConnectionKeysParams): void

    createInvoice(params: ICreateInvoiceParams): Promise<ICreateInvoiceResponse>

    checkInvoiceStatus(params: ICheckInvoiceStatusParams): Promise<ICheckInvoiceStatusResponse>
    checkPaymentStatusByMerchantTransId(params: ICheckPaymentStatusByMerchantTransId): Promise<ICheckPaymentStatusByMerchantTransIdResponse>
    checkPaymentStatus(params: ICheckPaymentStatusParams): Promise<ICheckPaymentStatusResponse>

    refundPartial(params: IRefoundPartialParams): Promise<IRefoundPartialResponse>
    cancellationPayment(params: ICancellationPaymentParams): Promise<ICancellationPaymentResponse>

    createTokenCard(params: ICreateTokenCardParams): Promise<ICreateTokenCardResponse>
    verificationTokenCard(params: IVerificationTokenCardParams): Promise<IVerificationTokenCardResponse>

    payWithToken(params: IPayWithTokenParams): Promise<IPayWithTokenResponse>
    deleteTokenCard(params: IDeleteTokenCardParams): Promise<IDeleteTokenCardResponse>
}

interface IDeleteTokenCardResponse {
    error_code: number
    error_note: string
}

interface IDeleteTokenCardParams{
    service_id: number
    card_token: number
}

interface IPayWithTokenResponse {
    error_code: number
    error_note: string
    payment_id: number
    payment_status: number
}

interface IPayWithTokenParams{
    card_token: string
    amount: number
    merchant_trans_id: string
}

interface IVerificationTokenCardResponse {
    error_code: number
    error_note: string
    card_number: string
}

interface IVerificationTokenCardParams{
    service_id: number
    card_token: string
    sms_code: number
}

interface ICreateTokenCardResponse{
    error_code: number
    error_note: string
    card_token: string
    phone_number: string
    temporary: boolean
}

interface ICreateTokenCardParams{
    service_id: number
    card_number: string
    expire_date: string
    temporary: boolean
}

interface ICreateInvoiceParams{
    service_id: number
    amount: number
    phone_number: string
    merchant_trans_id: string //requestId
}

interface ICreateInvoiceResponse{
    error_code: number
    error_note: string
    invoice_id: number
}

interface ICheckInvoiceStatusParams {
    service_id: number
    invoice_id: number
}

interface ICheckInvoiceStatusResponse{
    error_code: number
    error_note: string
    invoice_status: number
    invoice_status_note: number
}

interface ICheckPaymentStatusParams{
    payment_id: number
    service_id: number
}

interface ICheckPaymentStatusResponse{
    payment_id: number
    error_code: number
    error_note: string
    payment_status: number
}

interface ICheckPaymentStatusByMerchantTransId {
    service_id: number
    merchant_trans_id: string
    YYYY_MM_DD: string
}

interface ICheckPaymentStatusByMerchantTransIdResponse {
    payment_id: number
    error_code: number
    error_note: string
    payment_status: number
}

interface ICancellationPaymentParams{
    service_id: number
    payment_id: number
}

interface ICancellationPaymentResponse {
    payment_id: number
    error_code: number
    error_note: string
}

interface IRefoundPartialParams {
    payment_id: number
    service_id: number
    amount: number
}

interface IRefoundPartialResponse {
    error_code: number
    error_note: string
}

interface IConnectionKeysParams$1 {
    merchant_id: number;
    service_id: number;
    user_id: number;
    secret_key: string
}

declare class MerchantApi implements IMerchantApi {
    private secret_key;
    private merchant_id;
    private service_id;
    private user_id;
    setConnectionKeys(params: IConnectionKeysParams$1): void;
    createInvoice(params: ICreateInvoiceParams): Promise<ICreateInvoiceResponse>;
    checkPaymentStatusByMerchantTransId(params: ICheckPaymentStatusByMerchantTransId): Promise<ICheckPaymentStatusByMerchantTransIdResponse>;
    checkInvoiceStatus(params: ICheckInvoiceStatusParams): Promise<ICheckInvoiceStatusResponse>;
    checkPaymentStatus(params: ICheckPaymentStatusParams): Promise<ICheckPaymentStatusResponse>;
    cancellationPayment(params: ICancellationPaymentParams): Promise<ICancellationPaymentResponse>;
    refundPartial(params: IRefoundPartialParams): Promise<IRefoundPartialResponse>;
    createTokenCard(params: ICreateTokenCardParams): Promise<ICreateTokenCardResponse>;
    verificationTokenCard(params: IVerificationTokenCardParams): Promise<IVerificationTokenCardResponse>;
    payWithToken(params: IPayWithTokenParams): Promise<IPayWithTokenResponse>;
    deleteTokenCard(params: IDeleteTokenCardParams): Promise<IDeleteTokenCardResponse>;
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

interface ICompleteApiParams {
    click_trans_id: number
    service_id: number
    click_paydoc_id: number
    merchant_trans_id: string
    amount: number
    action: number
    error: number
    error_note: string
    sign_time: string
    sign_string: string
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
    service_id: number
    sign_time: string
    sign_string: string
    action: number
    click_trans_id: number 
    click_paydoc_id: number
    amount: number
    merchant_trans_id: string
    error: number
    error_note: string
}

interface IPrepareApiResponse {
    click_trans_id: number
    merchant_trans_id: string
    merchant_prepare_id: number
    error: number
    error_note: string
    sign_time: string
    sign_string: string
}

interface IShoppingApi {
    setConnectionKeys(params: IConnectionKeysParams$1): void
    prepare(params: IPrepareApiParams): Promise<IPrepareApiResponse> 
    complete(params: ICompleteApiParams): Promise<ICompleteApiResponse>
}

declare class ShoppingApi implements IShoppingApi {
    private secret_key;
    private merchant_id;
    private service_id;
    private user_id;
    private sign_string;
    setConnectionKeys(params: IConnectionKeysParams$1): void;
    prepare(params: IPrepareApiParams): Promise<IPrepareApiResponse>;
    complete(params: ICompleteApiParams): Promise<ICompleteApiResponse>;
    private checkSignString;
    private checkError;
    /**
     * Sets sign_string property
     * @private
     * @param {IPrepareApiParams}
     */
    private set signStringForPrepare(value);
    private set signStringForComplete(value);
    private validateCredentials;
}

type TPaymentApi = 'shopping' | 'merchant'

declare class ClickClient {
    static create<T extends TPaymentApi>(type: T): T extends 'merchant' ? MerchantApi : ShoppingApi;
}

export { ClickClient };
