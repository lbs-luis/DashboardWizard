import { api } from '@/lib/axios'
import { Store } from '@/lib/data/storeState'

interface GetUserStoresResponse {
  stores: Store[]

}


export async function getStores() {
  return await api.get<GetUserStoresResponse>('/me/stores')
}
