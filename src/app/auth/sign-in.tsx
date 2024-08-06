import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { signIn } from '@/api/auth/sign-in'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { getProfile } from '@/api/profile/get-profile'
import useUserState from '@/lib/data/userState'
import { getStores } from '@/api/profile/get-stores'
import useStoreState, { Store } from '@/lib/data/storeState'

const signInForm = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const [searchParams, setSearchParams] = useSearchParams()
  const hasSessionExpired = searchParams.get('expired') ?? null
  const { updateUser } = useUserState()
  const { updateStore } = useStoreState()
  const navigate = useNavigate()

  const [showSecondForm, setShowSecondForm] = useState(false)
  const [storesList, setStoresList] = useState<Store[]>([])

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })
  const { mutateAsync: profile } = useMutation({
    mutationFn: getProfile,
  })
  const { mutateAsync: stores } = useMutation({
    mutationFn: getStores,
  })

  function handleSetStore(store: Store) {
    updateStore(store)
    navigate('/', { replace: true })
  }

  async function handleSignin(data: SignInForm) {
    await authenticate(data)
      .then(async (response) => {        
        localStorage.setItem('authToken', response.data.token)
        
        await profile()
          .then((profileData) => {
            const { name, created_at, email, id, role } = profileData.data.user
            updateUser({ email, created_at, role, name, id })
          })
          .catch((error) => {            
            toast.error(error.message)
          })

        await stores()
          .then((storesData) => {
            const stores = storesData.data.stores
            setStoresList(stores)
          })
          .catch((error) => toast.error(error.message))
      })
      .catch((error) => toast.error(error.message))
  }

  useEffect(() => {
    if (hasSessionExpired) {
      toast.error('Sessão expirada')
      setSearchParams((state) => {
        state.delete('expired')
        return state
      })
    }
  })

  useEffect(() => {
    if (storesList.length > 0) setShowSecondForm(true)
  }, [storesList])

  return (
    <>
      <Helmet title="Login" />
      <div className="p-2">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>

        <div className="w-[350px] h-full overflow-x-hidden relative p-2">
          <div
            className={`flex flex-col justify-center gap-6 ${
              showSecondForm
                ? 'opacity-0 pointer-events-none select-none'
                : 'opacity-100 pointer-events-auto'
            }`}
          >
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tighter">
                Acessar painel
              </h1>
              <p className="text-sm text-muted-foreground">
                Deixe a magia🪄 acontecer!
              </p>
            </div>

            <form
              onSubmit={handleSubmit(handleSignin)}
              className="space-y-4 gap-4"
            >
              <div className="flex flex-col gap-2">
                <Label>Seu e-mail</Label>
                <Input type="email" {...register('email')} />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Sua senha</Label>
                <Input type="password" {...register('password')} />
                <span className="text-sm text-rose-600">
                  {errors?.password?.message}
                </span>
              </div>
              <Button disabled={isSubmitting} className="w-full" type="submit">
                Acessar painel
              </Button>
            </form>
          </div>
          <div
            className={`flex flex-col w-full h-full absolute  gap-4 top-0 transition-transform duration-200 ${
              showSecondForm ? '-translate-x-[10px]' : 'translate-x-[350px]'
            }`}
          >
            {storesList.length > 0 &&
              storesList.map((store) => {
                return (
                  <div
                    className="flex flex-col gap-2 p-2"
                    key={store.store_custom_id}
                  >
                    <span className="text-start text-sm text-primary/60 font-extralight">
                      {store.store_custom_id}
                    </span>
                    <Button
                      onClick={() => handleSetStore(store)}
                      variant="outline"
                      className="hover:text-primary hover:border-primary hover:bg-transparent font-bold py-6"
                    >
                      {store.name}
                    </Button>
                    <span className="first-letter:capitalize text-base text-center">
                      {store.description}
                    </span>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}
