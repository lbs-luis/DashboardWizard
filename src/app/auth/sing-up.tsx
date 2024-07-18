import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { registerStoreAndManager } from '@/api/register-store-and-manager'
import { zodResolver } from '@hookform/resolvers/zod'

const signUpForm = z.object({
  storeName: z.string(),
  storeDescription: z.string(),
  storeCustomId: z.string().regex(/^[a-zA-Z0-9-_]+$/, {
    message: "ID deve conter apenas letras, números, '-' e '_', sem espaços.",
  }),
  managerName: z.string(),
  managerEmail: z.string().email(),
  managerPassword: z.string().min(6, {
    message: 'Uma senha segura deve ter pelo menos 6 caracteres',
  }),
})
type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpForm>({ resolver: zodResolver(signUpForm) })

  const { mutateAsync: registerStoreFn } = useMutation({
    mutationFn: registerStoreAndManager,
  })

  async function handlesignUp(data: SignUpForm) {
    const {
      managerEmail,
      storeDescription,
      managerPassword,
      storeCustomId,
      storeName,
      managerName,
    } = data

    try {
      await registerStoreFn({
        managerEmail,
        storeDescription,
        managerPassword,
        storeCustomId,
        storeName,
        managerName,
      })
      toast.success('Estabelecimento cadastrado com sucesso!', {
        action: {
          label: 'Entrar',
          onClick: () => navigate(`/sign-in?email=${email}`),
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
            <div className="flex flex-col gap-2">
              <Label>Nome do estabelecimento</Label>
              <Input type="text" {...register('storeName')} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Seu nome</Label>
              <Input type="text" {...register('managerName')} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Seu e-mail</Label>
              <Input type="email" {...register('managerEmail')} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Crie uma senha segura</Label>
              <Input type="password" {...register('managerPassword')} />
              <span className="text-sm text-rose-600">
                {errors?.managerPassword?.message}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Que tal um solgan para o seu negócio</Label>
              <Input type="text" {...register('storeDescription')} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>ID Customizado da Loja</Label>
              <Input type="text" {...register('storeCustomId')} />
              <span className="text-sm text-rose-600">
                {errors?.storeCustomId?.message}
              </span>
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
