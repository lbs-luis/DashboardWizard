import { api } from '@/lib/axios'

interface GetProducts {
  storeId: string,
}
export interface GetProductsResponse {
  products: {
    id: string;
    product_custom_id: string;
    bar_code: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    created_at: Date;
    updated_at: Date;
    store_id: string;
  }[]
}

export async function getProducts({ storeId }: GetProducts) {
  return await api.post<GetProductsResponse>('/store/get-products', { storeId })
}
