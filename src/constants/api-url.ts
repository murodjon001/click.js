export const CLICK_API_URL = 'https://api.click.uz/v2/merchant/'

export const CREATED_INVOICE = CLICK_API_URL + 'invoice/create'
export const CHECKED_STATUS_INVOICE = CLICK_API_URL + 'invoice/status/'
export const CHECKED_STATUS_PAYMENT = CLICK_API_URL + 'payment/status/'
export const CHECKED_STATUS_BY_MERCHANT_TRANS_ID = CLICK_API_URL + 'payment/status_by_mti/' 
export const REFUNDED_PARTIAL = CLICK_API_URL + 'payment/partial_reversal/'
export const CANCELLED_PAYMENT = CLICK_API_URL + 'payment/reversal/'
export const CREATED_TOKEN = CLICK_API_URL + 'card_token/request'
export const VERIFICATED_TOKEN = CLICK_API_URL + 'card_token/verify'
export const PAYED_BY_TOKEN = CLICK_API_URL + 'card_token/payment'
export const DELETED_TOKEN = CLICK_API_URL + 'card_token/'


