import { api } from '@/lib/axios'

interface DeleteProduct {
  product_custom_id: string,
}


export async function deleteProduct({ product_custom_id }: DeleteProduct) {
  return await api.post('/store/delete-product', { product_custom_id })
}
