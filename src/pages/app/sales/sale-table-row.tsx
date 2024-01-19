import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { ArrowRight, Search, X } from 'lucide-react'
import { SaleDetails } from './sale-details-'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { OrderStatus } from '@/components/order-status'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cancelOrder } from '@/api/cancel-order'
import { GetOrders } from '@/api/get-orders'
import { toast } from 'sonner'
import { approveOrder } from '@/api/approve-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { deliverOrder } from '@/api/deliver-order'

export interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    totalInCents: number
  }
}

export function SaleTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const queryClient = useQueryClient()

  const orderStatusNameMap: Record<OrderStatus, string> = {
    pending: 'Pendente',
    canceled: 'CANCELADO',
    delivered: 'ENTREGUE',
    delivering: 'EM ENTREGA',
    processing: 'EM PREPARO',
  }

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    const ordersListCache = queryClient.getQueriesData<GetOrders>({
      queryKey: ['orders'],
    })

    const ordersUpdated = new Set<string>()

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<GetOrders>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            if (!ordersUpdated.has(orderId)) {
              const statusName = orderStatusNameMap[status]
              toast.success(`O Pedido ${orderId} está ${statusName}!`)
            }
            ordersUpdated.add(orderId)
            return { ...order, status }
          }
          return order
        }),
      })
    })
  }

  const { mutateAsync: CancelOrder, isPending: isCanceling } = useMutation({
    mutationFn: cancelOrder,
    onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'canceled')
    },
  })
  const { mutateAsync: ApproveOrder, isPending: isApproving } = useMutation({
    mutationFn: approveOrder,
    onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'processing')
    },
  })
  const { mutateAsync: DeliverOrder, isPending: isDelivering } = useMutation({
    mutationFn: deliverOrder,
    onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'delivered')
    },
  })
  const { mutateAsync: DispatchOrder, isPending: isDispatching } = useMutation({
    mutationFn: dispatchOrder,
    onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, 'delivering')
    },
  })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <SaleDetails open={isDetailsOpen} orderId={order.orderId} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.totalInCents / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        {order.status === 'pending' && (
          <Button
            onClick={() => ApproveOrder({ orderId: order.orderId })}
            disabled={isApproving}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Aprovar
          </Button>
        )}
        {order.status === 'processing' && (
          <Button
            onClick={() => DispatchOrder({ orderId: order.orderId })}
            disabled={isDispatching}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Em entrega
          </Button>
        )}
        {order.status === 'delivering' && (
          <Button
            onClick={() => DeliverOrder({ orderId: order.orderId })}
            disabled={isDelivering}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          disabled={
            !['pending', 'processing'].includes(order.status) || isCanceling
          }
          onClick={() => CancelOrder({ orderId: order.orderId })}
          variant="ghost"
          size="xs"
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
