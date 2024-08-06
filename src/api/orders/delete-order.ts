import { api } from '@/lib/axios'

interface DeleteOrder {
  orderId: string,
}


export async function deleteOrder({ orderId }: DeleteOrder) {
  return await api.post('/store/delete-order', { orderId })
}
