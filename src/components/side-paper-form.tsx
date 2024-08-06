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
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

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
            <label className="text-sm text-secondary-foreground font-semibold">
              Identificador
            </label>
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
          <div className="flex flex-col w-full gap-2">
            <span className="text-sm text-secondary-foreground font-semibold">
              Tipo de comanda
            </span>
            <RadioGroup
              defaultValue="Intern"
              className="flex flex-row w-full"
              onValueChange={(value: 'Intern' | 'Personal') =>
                setOrderType(value)
              }
            >
              <div className="flex items-center space-x-2 flex-1  border-b-2 border-transparent hover:border-primary transition-all duration-200 p-0">
                <RadioGroupItem value="Intern" id="Option1" />
                <Label
                  htmlFor="Option1"
                  className="w-full cursor-pointer py-4 h-full"
                >
                  Interna
                </Label>
              </div>
              <div className="flex items-center space-x-2 flex-1  border-b-2 border-transparent hover:border-primary transition-all duration-200 p-0">
                <RadioGroupItem value="Personal" id="Option2" />
                <Label
                  htmlFor="Option2"
                  className="w-full cursor-pointer py-4 h-full"
                >
                  Pessoal
                </Label>
              </div>
            </RadioGroup>
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
