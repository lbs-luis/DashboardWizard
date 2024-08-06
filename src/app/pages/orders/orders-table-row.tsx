import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { Search, Trash2 } from 'lucide-react'
import { OrderDetails } from './orders-details'
import { useState } from 'react'
import { Order } from '@/api/orders/get-orders'
import { OrderStatus } from '@/components/order-status'

export interface OrderTableRowProps {
  order: Order
  deleteHandler: (orderId: string) => Promise<void>
}

export function OrderTableRow({ order, deleteHandler }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const total = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  return (
    <>
      <TableRow className="cursor-pointer">
        <TableCell>
          <Button
            variant="outline"
            size="xs"
            onClick={() => setIsDetailsOpen(true)}
          >
            <Search className="h-3 w-3" />
            <span className="sr-only">{order.order_custom_id}</span>
          </Button>
        </TableCell>
        <TableCell className="text-md font-medium">
          {order.order_custom_id}
        </TableCell>
        <TableCell className="font-medium">
          {total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </TableCell>
        <TableCell className="font-medium">
          <OrderStatus status={order.status} />
        </TableCell>
        <TableCell className="font-medium">
          <Button
            onClick={() => setOpenConfirm(true)}
            variant="outline"
            size="xs"
            className="hover:text-white hover:border-rose-500 hover:bg-rose-500"
          >
            <Trash2 strokeWidth={2} className="w-5 h-5" />
          </Button>
        </TableCell>
      </TableRow>
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <OrderDetails order={order} />
      </Dialog>
      <Dialog open={openConfirm} onOpenChange={() => setOpenConfirm(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row gap-1">
              Deseja <p className="text-rose-500">excluir</p>esta comanda?
            </DialogTitle>
            <DialogDescription>
              Confirmando a exclusão desta comanda todo seu histórico de
              movimentação também será perdido.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-row gap-2 w-fit place-self-end">
            <Button
              variant="outline"
              className="hover:text-rose-500 hover:border-rose-500 hover:bg-transparent w-16"
              onClick={() => {
                deleteHandler(order.id)
                setOpenConfirm(false)
              }}
            >
              sim
            </Button>
            <Button
              variant="destructive"
              className="w-20"
              onClick={() => setOpenConfirm(false)}
            >
              não
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
