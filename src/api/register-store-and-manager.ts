import { api } from '@/lib/axios'

interface RegisterStoreBody {
  storeName: string
  storeDescription: string
  storeCustomId: string
  managerName: string
  managerEmail: string
  managerPassword: string
}

export async function registerStoreAndManager(reqBody: RegisterStoreBody) {
  await api.post('/sign-up/store', reqBody)
}
