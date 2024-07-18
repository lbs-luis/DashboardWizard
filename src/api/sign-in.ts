import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
  password: string
}

export async function signIn(data: SignInBody) {
  const response = await api.post('/sign-in', data)
  return response.data
}
