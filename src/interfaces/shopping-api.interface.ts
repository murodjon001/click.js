import { ICompleteApiParams } from "./complete-api-params.interface"
import { ICompleteApiResponse } from "./complete-api-response.interface"
import { IPrepareApiParams } from "./prepare-api-params.interface"
import { IPrepareApiResponse } from "./prepare-api-response.interface"
import { IShoppingApiParams } from "./shopping-api-params.interface"

export interface IShoppingApi {
    setConnectionKeys(params: IShoppingApiParams): void
    prepare(params: IPrepareApiParams): Promise<IPrepareApiResponse> 
    complete(params: ICompleteApiParams): Promise<ICompleteApiResponse>
}