import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Helmet } from 'react-helmet-async'
import { ProductTableRow } from './product-table-row'
import { ProductTableFilters } from './product-table-filters'
import { Pagination } from '@/components/pagination'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { ProductTableSkeleton } from './product-table-skeleton'
import { getProducts } from '@/api/get-products'

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const productId = searchParams.get('productId')
  const productName = searchParams.get('productName')

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: result, isLoading } = useQuery({
    queryKey: ['products', pageIndex, productId, productName],
    queryFn: () =>
      getProducts({
        pageIndex,
        productName,
        productId,
      }),
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((prev) => {
      prev.set('page', (pageIndex + 1).toString())
      return prev
    })
  }

  return (
    <>
      <Helmet title="Produtos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
        <div className="space-y-2.5">
          <ProductTableFilters />
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Produto</TableHead>
                  <TableHead className="flex-1">Descrição</TableHead>
                  <TableHead className="w-[140px]">Preço</TableHead>
                  <TableHead>Criado há</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && <ProductTableSkeleton />}
                {result &&
                  result.products.map((product) => {
                    return (
                      <ProductTableRow
                        key={product.productId}
                        product={product}
                      />
                    )
                  })}
              </TableBody>
            </Table>
          </div>
          {result && (
            <Pagination
              pageIndex={result.meta.pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
              onPageChange={handlePaginate}
            />
          )}
        </div>
      </div>
    </>
  )
}
