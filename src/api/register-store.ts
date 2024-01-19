import { api } from '@/lib/axios'

interface RegisterStoreBody {
  storeName: string
  managerName: string
  email: string
  phone: string
}

export async function registerStore(reqBody: RegisterStoreBody) {
  await api.post('/stores', reqBody)
}
