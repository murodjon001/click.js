import { ICompleteApiParams } from "./complete-api-params.interface"
import { ICompleteApiResponse } from "./complete-api-response.interface"
import { IPrepareApiParams } from "./prepare-api-params.interface"
import { IPrepareApiResponse } from "./prepare-api-response.interface"
import { IConnectionKeysParams } from "./connection-keys-params.interface"

export interface IShoppingApi {
    setConnectionKeys(params: IConnectionKeysParams): void
    prepare(params: IPrepareApiParams): Promise<IPrepareApiResponse> 
    complete(params: ICompleteApiParams): Promise<ICompleteApiResponse>
}