import { api } from '@/lib/axios'

export interface ManagedStore {
  id: string
  name: string
  description: string | null
  createdAt: Date | null
  updatedAt: Date | null
  managerId: string | null
}

export async function getManagedStore() {
  const res = await api.get<ManagedStore>('/managed-store')
  return res.data
}
