import { api } from '@/lib/axios'

export async function refreshSession() {
  return await api.get('/auth/refresh-session')
}
