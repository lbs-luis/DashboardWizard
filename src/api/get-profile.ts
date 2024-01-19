import { api } from '@/lib/axios'

interface Profile {
  id: string
  name: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getProfile() {
  const res = await api.get<Profile>('/me')
  return res.data
}
