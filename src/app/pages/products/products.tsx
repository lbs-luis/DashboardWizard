import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Helmet } from 'react-helmet-async'
import { ProductTableRow } from './product-table-row'
import { Pagination } from '@/components/pagination'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { ProductTableSkeleton } from './product-table-skeleton'
import { getProducts } from '@/api/products/get-products'
import { ProductTableButtons } from './product-table-buttons'
import useStoreState from '@/lib/data/storeState'

interface Product {
  id: string
  product_custom_id: string
  bar_code: string
  name: string
  description: string
  price: number
  quantity: number
  created_at: Date
  updated_at: Date
  store_id: string
}

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const productId = searchParams.get('productId') ?? ''
  const productName = searchParams.get('productName') ?? ''
  const { store } = useStoreState()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1) // Transformar para 0-indexed
    .parse(searchParams.get('page') ?? '1')

  const perPage = 10

  const { data: result, isLoading } = useQuery({
    queryKey: ['products', productId, productName],
    queryFn: () => getProducts({ storeId: store.id }),
  })

  // Função para alterar a página
  function handlePaginate(pageIndex: number) {
    setSearchParams((prev) => {
      prev.set('page', (pageIndex + 1).toString())
      return prev
    })
  }

  // Filtra produtos baseado no ID e nome
  const filterProducts = (products: Product[]) => {
    return products.filter((product) => {
      const matchesId =
        !productId || productId.length > 10
          ? product.bar_code.includes(productId)
          : product.product_custom_id.includes(productId)
      const matchesName =
        !productName ||
        product.name.toLowerCase().includes(productName.toLowerCase())
      return matchesId && matchesName
    })
  }

  // Produtos da página atual
  const products = result ? filterProducts(result.data.products) : []
  const totalCount = products.length
  const paginatedProducts = products.slice(
    pageIndex * perPage,
    (pageIndex + 1) * perPage,
  )

  return (
    <>
      <Helmet title="Produtos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
        <div className="space-y-2.5">
          <ProductTableButtons />
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Código</TableHead>
                  <TableHead className="w-[180px]">Nome</TableHead>
                  <TableHead className="flex-1">Descrição</TableHead>
                  <TableHead className="w-[140px] md:w-[240px]">
                    Preço
                  </TableHead>
                  <TableHead className="w-[140px] md:w-[240px]">
                    Quantidade
                  </TableHead>
                  <TableHead className="flex-1 text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && <ProductTableSkeleton />}
                {paginatedProducts.length > 0
                  ? paginatedProducts.map((product) => (
                      <ProductTableRow
                        key={product.product_custom_id}
                        product={product}
                      />
                    ))
                  : !isLoading && (
                      <p className="p-4">Nenhum produto encontrado.</p>
                    )}
              </TableBody>
            </Table>
          </div>
          {result && (
            <Pagination
              pageIndex={pageIndex}
              totalCount={totalCount}
              perPage={perPage}
              onPageChange={handlePaginate}
            />
          )}
        </div>
      </div>
    </>
  )
}
