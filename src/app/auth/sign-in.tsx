import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { signIn } from '@/api/sign-in'
import { zodResolver } from '@hookform/resolvers/zod'

const signInForm = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

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

  async function handleSignin(data: SignInForm) {
    try {
      await authenticate(data).then(() => {
        navigate('/', { replace: true })
      })
    } catch {
      toast.error('Credenciais inválidas.')
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>

        <div className="w-[350px] flex flex-col justify-center gap-6">
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
      </div>
    </>
  )
}
