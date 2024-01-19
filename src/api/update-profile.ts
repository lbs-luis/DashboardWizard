import { api } from '@/lib/axios'

interface UpdateProfile {
  name: string
  description: string | null
}

export async function updateProfile(body: UpdateProfile) {
  await api.put('/profile', body)
}
