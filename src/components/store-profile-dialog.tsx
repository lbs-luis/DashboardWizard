import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { ManagedStore, getManagedStore } from '@/api/get-managed-store'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { updateProfile } from '@/api/update-profile'
import { toast } from 'sonner'

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
})
type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const { data: managedStore } = useQuery({
    queryKey: ['managed-store'],
    queryFn: getManagedStore,
    staleTime: Infinity,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedStore?.name ?? '',
      description: managedStore?.description ?? '',
    },
  })

  const queryClient = useQueryClient()

  function updateManagedStoreCache({ name, description }: StoreProfileSchema) {
    const cached = queryClient.getQueryData<ManagedStore>(['managed-store'])
    if (cached)
      queryClient.setQueryData<ManagedStore>(['managed-store'], {
        ...cached,
        name,
        description,
      })
    return { cached }
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({ name, description }) {
      const { cached } = updateManagedStoreCache({ name, description })
      return { prev: cached }
    },
    onError(_, __, context) {
      if (context?.prev) updateManagedStoreCache(context.prev)
    },
  })

  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await updateProfileFn(data)

      toast.success('Perfil atualizado com sucesso!')
    } catch {
      toast.error('Falha ao atualizar o perfil, tente novamente mais tarde.')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-5 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-4" id="name" {...register('name')} />
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-4"
              id="description"
              {...register('description')}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
