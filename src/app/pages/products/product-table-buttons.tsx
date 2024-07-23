import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, X, PackagePlus } from 'lucide-react'
import { z } from 'zod'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {  
  useForm,
  UseFormRegister,  
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'react-router-dom'

const productFilterSchema = z.object({
  productId: z.string().optional(),
  productName: z.string().optional(),
})

type ProductFilterSchema = z.infer<typeof productFilterSchema>

export function ProductTableButtons() {
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
        <NewProductTab />
      </form>

      <div className="md:hidden flex gap-2">
        <FiltersTab
          handleSubmit={handleSubmit(handleFilter)}
          register={register}
          handleClearFilters={handleClearFilters}
        />
        <NewProductTab />
      </div>
    </>
  )
}

interface FiltersTabProps {
  handleSubmit: () => Promise<void>
  register: UseFormRegister<any>
  handleClearFilters: () => void
}

function FiltersTab({
  handleSubmit,
  register,
  handleClearFilters,
}: FiltersTabProps) {
  return (
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
          onSubmit={handleSubmit}
        >
          <Input placeholder="ID do produto" {...register('productId')} />
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
  )
}

const newProductSchema = z.object({
  product_custom_id: z.string().regex(/^[a-zA-Z0-9-_]+$/),
  productBarCode: z.string().regex(/^[a-zA-Z0-9-_]+$/),
  productName: z.string(),
  productDescription: z.string().optional(),
  productQuantity: z.number(),
})

type NewProductSchema = z.infer<typeof newProductSchema>

function NewProductTab() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewProductSchema>({
    resolver: zodResolver(newProductSchema),
  })

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="button" variant="outline" size="xs">
          <PackagePlus strokeWidth={1} className="h-4 w-4 mr-2" />
          Novo
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex justify-center items-center font-bold self-start">
            <PackagePlus className="h-6 w-6 mr-2" />
            NOVO PRODUTO
          </SheetTitle>
        </SheetHeader>

        <form className="flex flex-col items-center gap-2 mt-6">
          <Input placeholder="Código" {...register('product_custom_id')} />
          <Input
            placeholder="Código de Barras"
            {...register('productBarCode')}
          />
          <Input
            className="h-10 w-full"
            placeholder="Nome"
            {...register('productName')}
          />
          <Input
            className="h-10 w-full"
            placeholder="Descrição"
            {...register('productDescription')}
          />
          <Input
            className="h-10 w-full"
            placeholder="Quantidade"
            {...register('productQuantity')}
          />

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

            <Button type="submit" variant="secondary" size="sm">
              <PackagePlus className="h-4 w-4 mr-2" />
              Cadastrar
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
