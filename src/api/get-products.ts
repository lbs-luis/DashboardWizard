import { api } from '@/lib/axios'

export interface GetProductsQuery {
  pageIndex?: number | null
  productId?: string | null
  productName?: string | null
}

export interface GetProducts {
  products: {
    productId: string
    productName: string
    productDescription: string
    totalInCents: number
    createdAt: string
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getProducts({
  pageIndex,
  productName,
  productId,
}: GetProductsQuery) {
  const res = await api.get<GetProducts>('/products', {
    params: {
      pageIndex,
      productId,
      productName,
    },
  })

  return res.data
}
