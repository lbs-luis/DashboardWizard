import { api } from '@/lib/axios'

export async function connectToApi() {
  const res = await api.get('/con')
  return res.data
}
