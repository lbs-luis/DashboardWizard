import { api } from '@/lib/axios'
import { User } from '@/lib/data/userState'

interface GetUserProfileResponse {
  user: User
}


export async function getProfile() {
  return await api.get<GetUserProfileResponse>('/me')
}
