import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, X } from 'lucide-react'
import { z } from 'zod'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'react-router-dom'

const orderFilterSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFilterSchema = z.infer<typeof orderFilterSchema>

export function SaleTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const orderId = searchParams.get('orderId') ?? ''
  const customerName = searchParams.get('customerName') ?? ''
  const status = searchParams.get('status') ?? 'all'

  const { register, handleSubmit, control, reset } = useForm<OrderFilterSchema>(
    {
      resolver: zodResolver(orderFilterSchema),
      defaultValues: {
        orderId: orderId ?? '',
        customerName: customerName ?? '',
        status: status ?? 'all',
      },
    },
  )

  function handleFilter({ orderId, customerName, status }: OrderFilterSchema) {
    setSearchParams((state) => {
      if (orderId) {
        state.set('orderId', orderId)
      } else state.delete('orderId')

      if (customerName) {
        state.set('customerName', customerName)
      } else state.delete('customerName')

      if (status) {
        state.set('status', status)
      } else state.delete('status')

      state.set('page', '1')

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('orderId')
      state.delete('customerName')
      state.delete('status')
      state.set('page', '1')
      reset({
        customerName: '',
        orderId: '',
        status: 'all',
      })

      return state
    })
  }

  return (
    <>
      <form
        className="hidden md:flex items-center gap-2"
        onSubmit={handleSubmit(handleFilter)}
      >
        <span className="text-sm font-semibold">Filtros:</span>
        <Input
          className="h-8 w-auto"
          placeholder="ID do pedido"
          {...register('orderId')}
        />
        <Input
          className="h-8 w-[320px]"
          placeholder="Nome do cliente"
          {...register('customerName')}
        />
        <Controller
          name="status"
          control={control}
          render={({ field: { name, value, onChange, disabled } }) => {
            return (
              <Select
                defaultValue="all"
                name={name}
                value={value}
                disabled={disabled}
                onValueChange={onChange}
              >
                <SelectTrigger className="h-8 w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="_" className="hidden">
                    Status
                  </SelectItem>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="canceled">Cancelado</SelectItem>
                  <SelectItem value="processing">Em preparo</SelectItem>
                  <SelectItem value="delivering">Em entrega</SelectItem>
                  <SelectItem value="delivered">Entregue</SelectItem>
                </SelectContent>
              </Select>
            )
          }}
        ></Controller>

        <Button type="submit" variant="secondary" size="xs">
          <Search className="h-4 w-4 mr-2" />
          Filtrar resultados
        </Button>

        <Button
          onClick={handleClearFilters}
          type="button"
          variant="outline"
          size="xs"
        >
          <X className="h-4 w-4 mr-2" />
          Remover filtros
        </Button>
      </form>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            type="submit"
            variant="secondary"
            size="xs"
            className="md:hidden flex"
          >
            <Search className="h-4 w-4 mr-2" />
            Filtrar resultados
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="flex justify-center items-center font-bold self-start">
              <Search className="h-6 w-6 mr-2" />
              FILTRAR RESULTADOS
            </SheetTitle>
          </SheetHeader>

          <form
            className="flex flex-col items-center gap-2 mt-6"
            onSubmit={handleSubmit(handleFilter)}
          >
            <Input
              className="h-10 w-full"
              placeholder="ID do pedido"
              {...register('orderId')}
            />
            <div className="grid grid-cols-5 w-full gap-2">
              <Input
                className="h-10 w-full col-span-3"
                placeholder="Nome do cliente"
                {...register('customerName')}
              />

              <Controller
                name="status"
                control={control}
                render={({ field: { name, value, onChange, disabled } }) => {
                  return (
                    <Select
                      defaultValue="all"
                      name={name}
                      value={value}
                      disabled={disabled}
                      onValueChange={onChange}
                    >
                      <SelectTrigger className="h-10 w-full col-span-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="_" className="hidden">
                          Status
                        </SelectItem>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="canceled">Cancelado</SelectItem>
                        <SelectItem value="processing">Em preparo</SelectItem>
                        <SelectItem value="delivering">Em entrega</SelectItem>
                        <SelectItem value="delivered">Entregue</SelectItem>
                      </SelectContent>
                    </Select>
                  )
                }}
              ></Controller>
            </div>

            <div className="grid grid-cols-2 w-full gap-2 mt-2">
              <Button
                onClick={handleClearFilters}
                type="button"
                variant="outline"
                size="sm"
              >
                <X className="h-4 w-4 mr-2" />
                Remover filtros
              </Button>

              <Button type="submit" variant="secondary" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Filtrar resultados
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  )
}
