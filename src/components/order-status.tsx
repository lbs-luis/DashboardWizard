import { OrderStatus as IStatus } from '@/api/orders/register-order'

interface OrderStatusProps {
  status: IStatus
}
export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'InUse' && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-rose-500"
        />
      )}

      {status === 'Available' && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-emerald-500"
        />
      )}
      <span className="font-medium text-muted-foreground">
        {status === 'Available' && 'Disponível'}
        {status === 'InUse' && 'Conta aberta'}
      </span>
    </div>
  )
}
