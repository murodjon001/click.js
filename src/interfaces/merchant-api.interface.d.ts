export interface IMerchantApi{
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

export interface IDeleteTokenCardResponse {
    error_code: number
    error_note: string
}

export interface IDeleteTokenCardParams{
    service_id: number
    card_token: number
}

export interface IPayWithTokenResponse {
    error_code: number
    error_note: string
    payment_id: number
    payment_status: number
}

export interface IPayWithTokenParams{
    card_token: string
    amount: number
    merchant_trans_id: string
}

export interface IVerificationTokenCardResponse {
    error_code: number
    error_note: string
    card_number: string
}

export interface IVerificationTokenCardParams{
    service_id: number
    card_token: string
    sms_code: number
}

export interface ICreateTokenCardResponse{
    error_code: number
    error_note: string
    card_token: string
    phone_number: string
    temporary: boolean
}

export interface ICreateTokenCardParams{
    service_id: number
    card_number: string
    expire_date: string
    temporary: boolean
}

export interface ICreateInvoiceParams{
    service_id: number
    amount: number
    phone_number: string
    merchant_trans_id: string //requestId
}

export interface ICreateInvoiceResponse{
    error_code: number
    error_note: string
    invoice_id: number
}

export interface ICheckInvoiceStatusParams {
    service_id: number
    invoice_id: number
}

export interface ICheckInvoiceStatusResponse{
    error_code: number
    error_note: string
    invoice_status: number
    invoice_status_note: string
}

export interface ICheckPaymentStatusParams{
    payment_id: number
    service_id: number
}

export interface ICheckPaymentStatusResponse{
    payment_id: number
    error_code: number
    error_note: string
    payment_status: number
}

export interface ICheckPaymentStatusByMerchantTransId {
    service_id: number
    merchant_trans_id: string
    YYYY_MM_DD: string
}

export interface ICheckPaymentStatusByMerchantTransIdResponse {
    payment_id: number
    error_code: number
    error_note: string
    merchant_trans_id: string
}

export interface ICancellationPaymentParams{
    service_id: number
    payment_id: number
}

export interface ICancellationPaymentResponse {
    payment_id: number
    error_code: number
    error_note: string
}

export interface IRefoundPartialParams {
    payment_id: number
    service_id: number
    amount: number
}

export interface IRefoundPartialResponse {
    error_code: number
    error_note: string
}