export interface IPrepareApiParams {
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