import { api } from '@/lib/axios'
import { OrderType, OrderStatus } from './register-order';

interface GetOrders {
  storeId: string,
  type: OrderType
}

export interface Order {
  items: {
    price: number;
    id: string;
    name: string;
    description: string;
    quantity: number;
  }[];
  id: string;
  order_custom_id: string;
  status: OrderStatus;
  type: OrderType;
  store_id: string;
}[]
export interface GetOrdersResponse {
  orders: Order[]
}

export async function getOrders({ storeId, type }: GetOrders) {
  return await api.post<GetOrdersResponse>('/store/get-orders', { store_id: storeId, type })
}
