import { api } from '@/lib/axios'

export interface GetOrdersQuery {
  pageIndex?: number | null
  orderId?: string | null
  customerName?: string | null
  status?: string | null
}

export interface GetOrders {
  orders: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    totalInCents: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders({
  pageIndex,
  customerName,
  orderId,
  status,
}: GetOrdersQuery) {
  const res = await api.get<GetOrders>('/orders', {
    params: {
      pageIndex,
      orderId,
      customerName,
      status,
    },
  })

  return res.data
}
