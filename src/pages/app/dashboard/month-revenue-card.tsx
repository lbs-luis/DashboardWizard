import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { DollarSign } from 'lucide-react'

export function MonthRevenueCard() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        <DollarSign />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">R$ 2530,12</span>
        <p className="text-xs text-muted-foreground">
          <a className="text-emerald-500 dark:text-emerald-400">+2%</a> em
          relação ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}
