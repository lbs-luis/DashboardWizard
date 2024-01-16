import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Package } from 'lucide-react'

export function MonthSalesAmountCard() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-base font-semibold">Vendas (mês)</CardTitle>
        <Package />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">121</span>
        <p className="text-xs text-muted-foreground">
          <a className="text-emerald-500 dark:text-emerald-400">+43%</a> em
          relação ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}
