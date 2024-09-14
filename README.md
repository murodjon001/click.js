# Click.js

### Lightweight library to facilitate the integration of Click payment gateway in your backend application.

### Basic usage

```typescript
import { ClickClient } from 'click';

// choose the API Type (Merchant API and Shopping API)
const shoppingApi = ClickClient.create('shopping_api');

// set the API Key
shoppingApi.setConnectionKeys({
    merchant_trans_id: "merchant_trans_id",
    service_id: "service_id",
    user_id: "user_id",
    secret_key: "secret_key"
});

const prepare = await shoppingApi.prepare({
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
    merchant_prepare_id: prepare.merchant_prepare_id
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