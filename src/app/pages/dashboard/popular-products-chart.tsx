import { getPopularProducts } from '@/api/metrics/get-popular-products'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { BarChart, Loader2 } from 'lucide-react'

import { ResponsiveContainer, Cell, Pie, PieChart } from 'recharts'

import colors from 'tailwindcss/colors'

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.emerald[500],
  colors.violet[500],
  colors.rose[500],
]

export function PopularProductsChart() {
  // const { data: popularProducts } = useQuery({
  //   queryKey: ['metrics', 'popular-products'],
  //   queryFn: getPopularProducts,
  // })

  const popularProducts = [
    { product: 'CocaCola', amount: 671 },
    { product: 'Cerveja', amount: 432 },
    { product: 'X-Tudo', amount: 201 },
    { product: 'Cookie', amount: 234 },
  ]

  return (
    <Card className="md:col-span-3">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Produtos polulares
          </CardTitle>
          <BarChart className="w-4 h-4 text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent>
        {popularProducts ? (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart style={{ fontSize: 12 }}>
              <Pie
                data={popularProducts}
                dataKey="amount"
                name="product"
                cx="50$"
                cy="50%"
                outerRadius={86}
                innerRadius={64}
                strokeWidth={8}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                }) => {
                  const RADIAN = Math.PI / 180
                  const radius = 12 + innerRadius + (outerRadius - innerRadius)
                  const x = cx + radius * Math.cos(-midAngle * RADIAN)
                  const y = cy + radius * Math.sin(-midAngle * RADIAN)

                  return (
                    <text
                      x={x}
                      y={y}
                      className="fill-muted-foreground text-xs"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                    >
                      {popularProducts[index].product.length > 12
                        ? popularProducts[index].product
                            .substring(0, 12)
                            .concat('...')
                        : popularProducts[index].product}{' '}
                      ({value})
                    </text>
                  )
                }}
                labelLine={false}
              >
                {popularProducts.map((_, i) => {
                  return (
                    <Cell
                      key={`cell-${i}`}
                      fill={COLORS[i]}
                      className="stroke-background hover:opacity-80"
                    />
                  )
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
