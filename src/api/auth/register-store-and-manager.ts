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
  return await api.post('/auth/sign-up/store', reqBody)
}
