import { api } from '@/lib/axios'

export interface RegisterNewProduct {
  data: {
    product_custom_id: string
    productBarCode: string
    productName: string
    productDescription: string
    productQuantity: number
    productPrice: number
    storeId: string
  }
}

export async function registerProduct({ data }: RegisterNewProduct) {
  return await api.post('/store/register-product', { ...data })
}
