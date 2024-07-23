import { refreshSession } from '@/api/auth/refresh-session'
import { Header } from '@/components/header'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function AppLayout() {
  const navigate = useNavigate()
  const { mutateAsync: refreshSessionFn } = useMutation({
    mutationFn: refreshSession,
  })

  useEffect(() => {
    const validateSession = async () => {
      await refreshSessionFn().catch((_) => {
        navigate('/sign-in?expired=true', { replace: true })
      })
    }
    validateSession()
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
