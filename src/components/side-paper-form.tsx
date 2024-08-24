import { registerOrder } from '@/api/orders/register-order'
import useStoreState from '@/lib/data/storeState'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Book, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { FormLabel } from './form-label'

const newOrderSchema = z.object({
  order_custom_id: z.string(),
})

type NewOrderSchema = z.infer<typeof newOrderSchema>

export function SidePaperForm() {
  const [orderType, setOrderType] = useState<'Intern' | 'Personal'>('Intern')

  const { mutateAsync: registerNewOrder } = useMutation({
    mutationFn: registerOrder,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewOrderSchema>({
    resolver: zodResolver(newOrderSchema),
  })
  const { store } = useStoreState()

  async function handleRegisterNewOrder(data: NewOrderSchema) {
    const { order_custom_id } = data

    await registerNewOrder({
      order_custom_id,
      store_id: store.id,
      type: orderType,
    })
      .then((_) => toast.success('Comanda criada.'))
      .catch((error) => toast.error(error.message))
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="button" variant="outline" size="xs">
          <Book className="h-4 w-4 mr-2" />
          Novo
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex justify-center items-center font-bold self-start">
            <Book className="h-6 w-6 mr-2" />
            Nova comanda
          </SheetTitle>
          <SheetDescription>
            Cadastre uma nova comanda ou conta pessoal
          </SheetDescription>
        </SheetHeader>

        <form
          className="flex flex-col items-center gap-4 mt-6 transition-all duration-200"
          onSubmit={handleSubmit(handleRegisterNewOrder)}
        >
          <div className="flex flex-col w-full gap-2">
            <FormLabel>Identificador</FormLabel>
            <Input
              placeholder="nome... mesa..."
              {...register('order_custom_id')}
            />
            {errors.order_custom_id && (
              <span className="text-left text-sm text-rose-400">
                {errors.order_custom_id.message}
              </span>
            )}
          </div>
          <div className="w-full">
            <FormLabel>Tipo de Comanda</FormLabel>
            <Select
              defaultValue={orderType}
              onValueChange={(value: 'Intern' | 'Personal') =>
                setOrderType(value)
              }
            >
              <SelectTrigger className="h-12 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Intern">Interna</SelectItem>
                <SelectItem value="Personal">Pessoal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 w-full gap-2 mt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => reset()}
            >
              <X className="h-4 w-4 mr-2" />
              Limpar
            </Button>

            <Button type="submit" variant="default" size="sm">
              <Book className="h-4 w-4 mr-2" />
              Cadastrar
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
