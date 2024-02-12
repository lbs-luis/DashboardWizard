import { Header } from '@/components/header'
import { api } from '@/lib/axios'
import { isAxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function AppLayout() {
  const navigate = useNavigate()
  const [timeToShow, setTimeToShow] = useState<boolean>(false)

  const horaDoShow = async () => {
    await new Promise((resolve) => setTimeout(resolve, 10000))
    setTimeToShow(true)
  }
  useEffect(() => {
    horaDoShow()
  }, [])

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status
          const code = error.response?.data.code

          if (status === 401 && code === 'UNAUTHORIZED') {
            navigate('/sign-in', { replace: true })
          }
        }
      },
    )
    return () => api.interceptors.response.eject(interceptorId)
  }, [navigate])

  return (
    <>
      {timeToShow ? (
        <div className="flex min-h-screen flex-col antialiased">
          <Header />
          <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
            <Outlet />
          </div>
        </div>
      ) : (
        <h1>AINDA NÃO</h1>
      )}
    </>
  )
}
