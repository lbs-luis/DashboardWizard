import { api } from '@/lib/axios'

export async function refreshSession() {
  return await api.patch('/auth/refresh-session')
}
