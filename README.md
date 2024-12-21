# Click.js

### Lightweight library to facilitate the integration of Click payment gateway in your backend application.

### Basic usage


### Shopping api
```typescript
import { ClickClient } from 'click-uz-js';

// choose the API Type (Merchant API and Shopping API)
const shoppingApi = ClickClient.create('shopping');

// this keys given by click provider
shoppingApi.setConnectionKeys({
    merchant_id: "merchant_id",
    service_id: "service_id",
    user_id: "user_id",
    secret_key: "secret_key"
});

const prepare = await shoppingApi.prepare({
    sign_time: "YYYY-MM-DD HH:mm:ss",
    sign_string: "982c36169csdf89fdsd......",
    error_note: "Success",
    error: 0,
    action: 0,
    merchant_trans_id: "1"
    service_id: 55455,
    click_trans_id: 123456789,
    click_paydoc_id: 1234567,
    amount: 500000
})

// shoppingApi.prepare method returned:
// {
//     click_trans_id: number
//     merchant_trans_id: string
//     merchant_prepare_id: number
//     error: number
//     error_note: string
// }

const complete = await shoppingApi.complete({
    service_id: 55455
    click_trans_id: 123456789,
    click_paydoc_id: 1234567,
    merchant_trans_id: "1",
    amount: 500000,
    action: 0
    error: 0
    error_note: "Success",
    sign_time: "YYYY-MM-DD HH:mm:ss",
    sign_string: "982c36169csdf89fdsd......",
    merchant_prepare_id: 232313231
})

// shoppingApi.complete method returned:
// {
//     click_trans_id: number
//     merchant_trans_id: string
//     merchant_confirm_id: number
//     error: number
//     error_note: string
// }
```

### Merchant api
```typescript
import { ClickClient } from 'click-uz-js';

// choose the API Type (Merchant API and Shopping API)
const merchantApi = ClickClient.create('merchant');

// this keys given by click provider
merchantApi.setConnectionKeys({
    merchant_id: "merchant_id",
    service_id: "service_id",
    user_id: "user_id",
    secret_key: "secret_key"
});

// interface merchant api
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


export interface IDeleteTokenCardResponse {
    error_code: number
    error_note: string
}

export interface IDeleteTokenCardParams{
    service_id: number
    card_token: string
}

export interface IPayWithTokenResponse {
    error_code: number
    error_note: string
    payment_id: number
    payment_status: number
}

export interface IPayWithTokenParams{
    service_id: string
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
    invoice_status_note: number
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
    payment_status: number
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
 ```