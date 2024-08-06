import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Helmet } from 'react-helmet-async'
import { SaleTableRow } from './sale-table-row'
import { SaleTableFilters } from './sale-table-filters'
import { Pagination } from '@/components/pagination'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { SalesTableSkeleton } from './sales-table-skeleton'

export function Sales() {
  const [searchParams, setSearchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  function handlePaginate(pageIndex: number) {
    setSearchParams((prev) => {
      prev.set('page', (pageIndex + 1).toString())
      return prev
    })
  }

  return (
    <>
      <Helmet title="Vendas" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Vendas</h1>
        <div className="space-y-2.5">
          <SaleTableFilters />
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[180px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <SalesTableSkeleton />
                {/* {isLoading && <SalesTableSkeleton />}
                {result &&
                  result.orders.map((order) => {
                    return <SaleTableRow key={order.orderId} order={order} />
                  })} */}
              </TableBody>
            </Table>
          </div>
          {/* {result && (
            <Pagination
              pageIndex={result.meta.pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
              onPageChange={handlePaginate}
            />
          )} */}
        </div>
      </div>
    </>
  )
}
