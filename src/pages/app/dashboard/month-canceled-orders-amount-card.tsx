import { getMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { PackageX } from 'lucide-react'

export function MonthCanceledOrdersAmountCard() {
  const { data: monthCanceledOrdersAmount } = useQuery({
    queryFn: getMonthCanceledOrdersAmount,
    queryKey: ['metrics', 'month-canceled-amount'],
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-base font-semibold">
          Pedidos cancelados (mês)
        </CardTitle>
        <PackageX />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthCanceledOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthCanceledOrdersAmount.amount}
            </span>

            <p className="text-xs text-muted-foreground">
              {monthCanceledOrdersAmount.diffFromLastMonth >= 0 ? (
                <>
                  <a className="text-rose-500 dark:text-rose-400">
                    +{monthCanceledOrdersAmount.diffFromLastMonth}
                  </a>{' '}
                  em relação mês passado
                </>
              ) : (
                <>
                  <a className="text-emerald-500 dark:text-emerald-400">
                    {monthCanceledOrdersAmount.diffFromLastMonth}
                  </a>{' '}
                  em relação mês passado
                </>
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
