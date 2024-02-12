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

const productFilterSchema = z.object({
  productId: z.string().optional(),
  productName: z.string().optional(),
})

type ProductFilterSchema = z.infer<typeof productFilterSchema>

export function ProductTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const productId = searchParams.get('productId') ?? ''
  const productName = searchParams.get('productName') ?? ''

  const { register, handleSubmit, reset } = useForm<ProductFilterSchema>({
    resolver: zodResolver(productFilterSchema),
    defaultValues: {
      productId: productId ?? '',
      productName: productName ?? '',
    },
  })

  function handleFilter({ productId, productName }: ProductFilterSchema) {
    setSearchParams((state) => {
      if (productId) {
        state.set('productId', productId)
      } else state.delete('productId')

      if (productName) {
        state.set('productName', productName)
      } else state.delete('productName')

      state.set('page', '1')

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('productId')
      state.delete('productName')
      state.set('page', '1')
      reset({
        productName: '',
        productId: '',
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
          placeholder="ID do produto"
          {...register('productId')}
        />
        <Input
          className="h-8 w-[320px]"
          placeholder="Nome do produto"
          {...register('productName')}
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
              className=""
              placeholder="ID do produto"
              {...register('productId')}
            />
            <Input
              className="h-10 w-full"
              placeholder="Nome do produto"
              {...register('productName')}
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
    </>
  )
}
