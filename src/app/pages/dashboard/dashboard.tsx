import { Helmet } from 'react-helmet-async'
import { MonthRevenueCard } from './month-revenue-card'
import { MonthSalesAmountCard } from './month-sales-amount-card'
import { DaySalesAmountCard } from './day-sales-amount-card'
import { MonthCanceledOrdersAmountCard } from './month-canceled-orders-amount-card'
import { RevenueChart } from './revenue-chart'
import { PopularProductsChart } from './popular-products-chart'
export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tigh">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthSalesAmountCard />
          <DaySalesAmountCard />
          <MonthCanceledOrdersAmountCard />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </>
  )
}
