import { getMonthOrdersAmount } from '@/api/get-month-orders-amount'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { Package } from 'lucide-react'

export function MonthSalesAmountCard() {
  const { data: monthOrdersAmount } = useQuery({
    queryFn: getMonthOrdersAmount,
    queryKey: ['metrics', 'month-orders-amount'],
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-base font-semibold">Vendas (mês)</CardTitle>
        <Package />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthOrdersAmount?.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-xs text-muted-foreground">
              {monthOrdersAmount.diffFromLastMonth >= 0 ? (
                <>
                  <a className="text-emerald-500 dark:text-emerald-400">
                    +{monthOrdersAmount.diffFromLastMonth}
                  </a>{' '}
                  em relação mês passado
                </>
              ) : (
                <>
                  <a className="text-rose-500 dark:text-rose-400">
                    {monthOrdersAmount.diffFromLastMonth}
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
