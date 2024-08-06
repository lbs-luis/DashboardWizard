import { refreshSession } from '@/api/auth/refresh-session'
import { Header } from '@/components/header'
import { api } from '@/lib/axios'
import useStoreState from '@/lib/data/storeState'
import useUserState from '@/lib/data/userState'
import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function AppLayout() {
  const navigate = useNavigate()

  const { clearUser } = useUserState()
  const { clearStore } = useStoreState()

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          isAxiosError(error) &&
          error?.request &&
          error?.request?.responseText
        ) {
          try {
            const errorMessage = JSON.parse(error.request.responseText).error
            if (errorMessage === 'Unauthorized.') {
              refreshSession()
                .then((response) => {
                  localStorage.setItem('authToken', response.data.token)
                })
                .catch((_) => {
                  localStorage.clear()
                  clearStore()
                  clearUser()
                  navigate('/sign-in?expired=true', { replace: true })
                })
            }
            return Promise.reject(new Error(errorMessage))
          } catch (parseError) {
            return Promise.reject(new Error('Failed to parse error message.'))
          }
        }
        return Promise.reject(error)
      },
    )
    return () => api.interceptors.response.eject(interceptorId)
  }, [navigate])

  return (
    <>
      <div className="flex min-h-screen flex-col antialiased">
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
          <Outlet />
        </div>
      </div>
    </>
  )
}
