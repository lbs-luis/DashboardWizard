import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
  password: string
}

export async function signIn(data: SignInBody) {
  return await api.post('/auth/sign-in', data)
}
