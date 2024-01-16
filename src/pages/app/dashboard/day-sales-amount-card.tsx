import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Package } from 'lucide-react'

export function DaySalesAmountCard() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-base font-semibold">Vendas (dia)</CardTitle>
        <Package />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">21</span>
        <p className="text-xs text-muted-foreground">
          <a className="text-rose-500 dark:text-rose-400">-4%</a> em relação a
          ontem
        </p>
      </CardContent>
    </Card>
  )
}
