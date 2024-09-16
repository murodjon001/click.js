# Click.js

### Lightweight library to facilitate the integration of Click payment gateway in your backend application.

### Basic usage

### Basic usage


```typescript
import { ClickClient } from 'click-uz-js';

// choose the API Type (Merchant API and Shopping API)
const shoppingApi = ClickClient.create('shopping_api');

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