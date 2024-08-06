import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { z } from 'zod'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'react-router-dom'
import { OrderType } from '@/api/orders/register-order'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SidePaperForm } from '@/components/side-paper-form'

const productFilterSchema = z.object({
  orderName: z.string().optional(),
  status: z.string().optional(),
})

type ProductFilterSchema = z.infer<typeof productFilterSchema>

export function OrderTableButtons() {
  const [searchParams, setSearchParams] = useSearchParams()
  const orderType = searchParams.get('orderType') ?? 'Personal'
  const orderName = searchParams.get('orderName') ?? ''
  const status = searchParams.get('status') ?? 'all'

  const { register, handleSubmit, reset } = useForm<ProductFilterSchema>({
    resolver: zodResolver(productFilterSchema),
    defaultValues: {
      orderName: orderName ?? '',
      status: status ?? 'all',
    },
  })

  function handleFilter({ orderName, status }: ProductFilterSchema) {
    setSearchParams((state) => {
      if (orderName) {
        state.set('orderName', orderName)
      } else state.delete('orderName')
      if (status) {
        state.set('status', status)
      } else state.delete('status')

      state.set('page', '1')

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('orderName')
      state.delete('status')
      state.set('page', '1')
      reset({
        orderName: '',
      })

      return state
    })
  }

  function handleChangeOrderType(type: OrderType) {
    setSearchParams((state) => {
      state.set('orderType', type)
      state.set('page', '1')

      return state
    })
  }
  function handleChangeOrderStatus(status: 'all' | 'InUse' | 'Available') {
    setSearchParams((state) => {
      state.set('status', status)
      state.set('page', '1')

      return state
    })
  }

  return (
    <>
      <form
        className="hidden md:flex items-center gap-2"
        onSubmit={handleSubmit(handleFilter)}
      >
        <Select
          defaultValue={orderType}
          onValueChange={(value: OrderType) => handleChangeOrderType(value)}
        >
          <SelectTrigger className="h-8 w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Intern">Comandas Internas</SelectItem>
            <SelectItem value="Personal">Comandas Pessoais</SelectItem>
          </SelectContent>
        </Select>

        <Select
          defaultValue="all"
          onValueChange={(value: 'all' | 'InUse' | 'Available') =>
            handleChangeOrderStatus(value)
          }
        >
          <SelectTrigger className="h-8 w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as comandas</SelectItem>
            <SelectItem value="InUse">Conta aberta</SelectItem>
            <SelectItem value="Available">Disponível</SelectItem>
          </SelectContent>
        </Select>

        <Input
          className="h-8 w-auto"
          placeholder="Identificador"
          {...register('orderName')}
        />

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

        <SidePaperForm />
      </form>

      <div className="md:hidden flex gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button type="submit" variant="secondary" size="xs">
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
              <Select
                defaultValue={orderType}
                onValueChange={(value: OrderType) =>
                  handleChangeOrderType(value)
                }
              >
                <SelectTrigger className="h-12 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Intern">Comandas Internas</SelectItem>
                  <SelectItem value="Personal">Comandas Pessoais</SelectItem>
                </SelectContent>
              </Select>

              <Select
                defaultValue="all"
                onValueChange={(value: 'all' | 'InUse' | 'Available') =>
                  handleChangeOrderStatus(value)
                }
              >
                <SelectTrigger className="h-12 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as comandas</SelectItem>
                  <SelectItem value="InUse">Conta aberta</SelectItem>
                  <SelectItem value="Available">Disponível</SelectItem>
                </SelectContent>
              </Select>
              <Input
                className="h-12 w-full"
                placeholder="Identificador"
                {...register('orderName')}
              />

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
        {/* <SidePaperForm /> */}
      </div>
    </>
  )
}
