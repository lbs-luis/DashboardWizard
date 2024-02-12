import { api } from '@/lib/axios'

export async function connectToApi() {
  const res = await api.get('/')
  return res.data
}
