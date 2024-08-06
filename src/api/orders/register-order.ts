import { api } from '@/lib/axios'

export type OrderType = 'Intern' | 'Personal'
export type OrderStatus = 'InUse' | 'Available'
export type OrderItems = {
  id: string,
  name: string,
  description: string,
  quantity: number,
  price: number,
}
export interface Order {
  id: string
  items: OrderItems[]
  order_custom_id: string
  status: OrderStatus
  store_id: string
  type: OrderType
}
export interface RegisterNewOrder {
  type: OrderType,
  store_id: string,
  order_custom_id: string
}

export async function registerOrder({ order_custom_id, store_id, type }: RegisterNewOrder) {
  return await api.post<Order>('/store/register-order', { items: [], order_custom_id, store_id, type })
}
