import { getMonthRevenueAmount } from '@/api/get-month-revenue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

export function MonthRevenueCard() {
  const { data: monthRevenueAmount } = useQuery({
    queryFn: getMonthRevenueAmount,
    queryKey: ['metrics', 'month-revenue-amount'],
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        <DollarSign />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthRevenueAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {(monthRevenueAmount?.receipt / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>

            <p className="text-xs text-muted-foreground">
              {monthRevenueAmount.diffFromLastMonth >= 0 ? (
                <>
                  <a className="text-emerald-500 dark:text-emerald-400">
                    +{monthRevenueAmount.diffFromLastMonth}
                  </a>{' '}
                  em relação mês passado
                </>
              ) : (
                <>
                  <a className="text-rose-500 dark:text-rose-400">
                    {monthRevenueAmount.diffFromLastMonth}
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
