import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Helmet } from 'react-helmet-async'
import { OrderTableRow } from './orders-table-row'
import { OrderTableButtons } from './orders-table-buttons'
import { Pagination } from '@/components/pagination'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { SalesTableSkeleton } from './orders-table-skeleton'
import useStoreState from '@/lib/data/storeState'
import { getOrders, Order } from '@/api/orders/get-orders'

import { OrderType } from '@/api/orders/register-order'
import { deleteOrder } from '@/api/orders/delete-order'
import { toast } from 'sonner'
import { useState } from 'react'

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams()
  const orderName = searchParams.get('orderName') ?? ''
  const orderType = searchParams.get('orderType') ?? 'Personal'
  const orderStatus = searchParams.get('status') ?? 'all'
  const { store } = useStoreState()
  const [deleteList, setDeleteList] = useState<string[]>([])

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1) // Transformar para 0-indexed
    .parse(searchParams.get('page') ?? '1')

  const perPage = 10

  const { data: InternOrders, isLoading: isLoadingIntern } = useQuery({
    queryKey: ['orders', 'Intern', orderName],
    queryFn: () => getOrders({ storeId: store.id, type: 'Intern' }),
  })
  const { data: PersonalOrders, isLoading: isLoadingPersonal } = useQuery({
    queryKey: ['orders', 'Personal', orderName],
    queryFn: () => getOrders({ storeId: store.id, type: 'Personal' }),
  })

  function availableOrders() {
    if (!isLoadingPersonal && InternOrders?.data.orders) {
      return InternOrders.data.orders.filter(
        (order) => order.status === 'Available',
      ).length
    }
  }
  function unavailableOrders() {
    if (!isLoadingPersonal && InternOrders?.data.orders) {
      return InternOrders.data.orders.filter(
        (order) => order.status === 'InUse',
      ).length
    }
  }
  function trustedCustomerAccounts() {
    if (!isLoadingPersonal && PersonalOrders?.data.orders) {
      return PersonalOrders.data.orders.filter(
        (order) => order.status === 'InUse',
      ).length
    }
  }

  const currentList = orderType === 'Intern' ? InternOrders : PersonalOrders
  const isListLoading =
    orderType === 'Intern' ? isLoadingIntern : isLoadingPersonal

  const handlePaginate = (pageIndex: number) => {
    setSearchParams((prev) => {
      prev.set('page', (pageIndex + 1).toString())
      return prev
    })
  }

  const filterOrders = (orders: Order[], orderName: string) => {
    return orders.filter((order) => {
      const matchesName =
        !orderName || order.order_custom_id.toLowerCase().includes(orderName)
      return matchesName
    })
  }

  // Pedidos da página atual
  const allOrders = currentList?.data
    ? filterOrders(currentList.data.orders, orderName).filter((order) => {
        if (orderStatus === 'all') return order
        return order.status === orderStatus
      })
    : []
  const orders = allOrders.filter((order) => !deleteList.includes(order.id))
  const totalCount = orders.length
  const paginatedOrders = orders.slice(
    pageIndex * perPage,
    (pageIndex + 1) * perPage,
  )

  const { mutateAsync: _deleteOrder } = useMutation({
    mutationFn: deleteOrder,
  })

  async function handleDeleteOrder(orderId: string) {
    await _deleteOrder({ orderId })
      .then((_) => {
        toast.success('Comanda deletada')
        setDeleteList((state) => [...state, orderId])
      })
      .catch((error) => toast.error(error.message))
  }

  return (
    <>
      <Helmet title="Comandas" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Comandas {orderType === 'Personal' ? 'Pessoais' : 'Internas'}
        </h1>
        <div className="space-y-2.5">
          {!isLoadingIntern && (
            <div className="flex flex-row gap-4 text-sm font-semibold">
              <div className="flex flex-row items-center gap-2">
                Comandas disponíveis:
                <div className="bg-emerald-400 text-white px-2 py-1 rounded-md">
                  {availableOrders()}
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                contas pessoais abertas:
                <div className="bg-primary text-white px-2 py-1 rounded-md">
                  {trustedCustomerAccounts()}
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                Comandas em aberto:
                <div className="bg-rose-500 text-white px-2 py-1 rounded-md">
                  {unavailableOrders()}
                </div>
              </div>
            </div>
          )}
          <OrderTableButtons />
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[180px]">
                    {orderType === 'Intern' ? 'Comanda' : 'Conta'}
                  </TableHead>
                  <TableHead className="w-[140px]">Total</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead className="w-[64px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isListLoading && <SalesTableSkeleton />}
                {paginatedOrders.map((order) => (
                  <OrderTableRow
                    key={order.id}
                    order={order}
                    deleteHandler={handleDeleteOrder}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination
            pageIndex={pageIndex}
            totalCount={totalCount}
            perPage={perPage}
            onPageChange={handlePaginate}
          />
        </div>
      </div>
    </>
  )
}
