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
import { useForm, UseFormRegister } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { registerProduct } from '@/api/products/register-product'
import { toast } from 'sonner'
import useStoreState from '@/lib/data/storeState'
import useCurrencyInput from '@/lib/utils/useCurrency'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormLabel } from '@/components/form-label'

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
          placeholder="Código"
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
  product_custom_id: z.string().regex(/^[a-zA-Z0-9-_]+$/, {
    message: 'O código não pode conter caracteres especiais e espaços',
  }),
  productBarCode: z
    .string()
    .regex(/^\d*$/, {
      message: 'O código de barras deve conter apenas números',
    })
    .optional(),
  productName: z.string(),
  productDescription: z.string().optional(),
  productQuantity: z
    .string()
    .regex(/^\d+$/, { message: 'Quantidade deve ser um número' })
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: 'Quantidade deve ser um número válido',
    }),
})

type NewProductSchema = z.infer<typeof newProductSchema>

function NewProductTab() {
  const { mutateAsync: registerNewProduct } = useMutation({
    mutationFn: registerProduct,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewProductSchema>({
    resolver: zodResolver(newProductSchema),
  })
  const { store } = useStoreState()

  type StatusType = 'ready' | 'to prepare'
  const [statusType, setStatusType] = useState<StatusType>('ready')
  function handleChangeStatusType(_statusType: StatusType) {
    setStatusType(_statusType)
  }

  async function handleRegisterNewProduct(data: NewProductSchema) {
    const {
      productBarCode,
      productName,
      productQuantity,
      product_custom_id,
      productDescription,
    } = data

    await registerNewProduct({
      data: {
        product_custom_id,
        productBarCode: productBarCode || '',
        productDescription: productDescription || '',
        productName,
        productQuantity,
        storeId: store.id,
        productPrice: getValue(),
      },
    })
      .then(() => toast.success('Novo produto cadastrado'))
      .catch((error) => toast.error(error.message))
  }

  const {
    value: price,
    handleChange: handlePriceChange,
    getValue,
  } = useCurrencyInput()

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
            Novo produto
          </SheetTitle>
        </SheetHeader>

        <form
          className="flex flex-col items-center gap-2 mt-6 transition-all duration-200"
          onSubmit={handleSubmit(handleRegisterNewProduct)}
        >
          <div className="flex flex-col w-full gap-1">
            <FormLabel>Código</FormLabel>
            <Input placeholder="XX00" {...register('product_custom_id')} />
            {errors.product_custom_id && (
              <span className="text-left text-sm text-rose-400">
                {errors.product_custom_id.message}
              </span>
            )}
          </div>

          <div className="flex flex-col w-full gap-1">
            <FormLabel>Código de Barras</FormLabel>
            <Input
              placeholder="0000000000000"
              {...register('productBarCode')}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label className="text-sm text-secondary-foreground">Nome</label>
            <Input
              className="h-10 w-full"
              placeholder="Nome do produto"
              {...register('productName')}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <FormLabel>Descrição</FormLabel>
            <Input
              className="h-10 w-full"
              placeholder="Descrição do produto"
              {...register('productDescription')}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <FormLabel>Quantidade</FormLabel>
            <Input
              className="h-10 w-full"
              placeholder="00"
              {...register('productQuantity')}
            />
            {errors.productQuantity && (
              <span className="text-left text-sm text-rose-400">
                {errors.productQuantity.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full gap-1">
            <FormLabel>Preço</FormLabel>
            <Input
              value={price}
              onChange={handlePriceChange}
              className="h-10 w-full"
              placeholder="R$: 00,00"
            />
          </div>
          <div className="w-full">
            <FormLabel>Disponibilidade</FormLabel>
            <Select
              defaultValue={statusType}
              onValueChange={(value: StatusType) =>
                handleChangeStatusType(value)
              }
            >
              <SelectTrigger className="h-12 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ready">🟢 Pronta entrega</SelectItem>
                <SelectItem value="to prepare">
                  🔴 Precisa ser preparado
                </SelectItem>
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
              <PackagePlus className="h-4 w-4 mr-2" />
              Cadastrar
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
