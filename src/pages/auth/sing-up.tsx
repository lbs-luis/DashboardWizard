import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'

const signUpForm = z.object({
  establishmentName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})
type signUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<signUpForm>()

  async function handlesignUp(data: signUpForm) {
    try {
      console.log(data)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success('Estabelecimento cadastrado com sucesso!', {
        action: {
          label: 'Entrar',
          onClick: () => navigate('/sign-in'),
        },
      })
    } catch {
      toast.error('Erro ao criar o cadastro do seu etabelecimento.')
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Meu estabelecimento</Link>
        </Button>
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Criar perfil de estabelecimento
            </h1>
            <p className="text-sm text-muted-foreground">
              O 🧙‍♀️ tem o feitiço perfeito para o seu negócio!
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handlesignUp)}
            className="space-y-4 gap-4"
          >
            <div className="space-y-2">
              <Label>Nome do estabelecimento</Label>
              <Input
                id="establishmentName"
                type="text"
                {...register('establishmentName')}
              />
            </div>
            <div className="space-y-2">
              <Label>Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register('managerName')}
              />
            </div>
            <div className="space-y-2">
              <Label>Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <div className="space-y-2">
              <Label>Seu numero de celular</Label>
              <Input id="phone" type="tel" {...register('phone')} />
            </div>
            <Button disabled={isSubmitting} className="w-full" type="submit">
              Criar perfil
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <a className="underline underline-offset-4">Termos</a> de serviço
              e{' '}
              <a className="underline underline-offset-4">
                politicas de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
