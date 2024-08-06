import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { OrderStatus } from '@/components/order-status'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableHead,
  TableFooter,
} from '@/components/ui/table'
import { Order } from '@/api/orders/get-orders'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { getProducts } from '@/api/products/get-products'
import useStoreState from '@/lib/data/storeState'
import { useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ProductsComboBoxProps {}

function ProductsComboBox({}: ProductsComboBoxProps) {
  const [openComboBox, setOpenComboBox] = useState(false)
  const { store } = useStoreState()
  const { data: result, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts({ storeId: store.id }),
  })

  const productsResumed =
    result?.data.products.map((product) => ({
      value: {
        code: product.product_custom_id,
        barcode: product.bar_code,
        name: product.name,
      },
      label: `${product.product_custom_id} | ${product.name}`,
    })) || []
  const [value, setValue] = useState('')

  return (
    <Popover open={openComboBox} onOpenChange={setOpenComboBox}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={openComboBox}
          className="w-full justify-between"
        >
          {'Pesquisar produtos'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[350px] md:w-[464px]">
        <Command>
          <CommandInput placeholder="nome... código... cód.bar..." />
          <CommandList>
            <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
            <CommandGroup>
              {productsResumed.length > 0 &&
                productsResumed.map((product) => (
                  <CommandItem
                    key={product.value.code}
                    value={product.label}
                    onSelect={(currentValue) => {
                      console.log(currentValue)
                      setOpenComboBox(false)
                    }}
                  >
                    {product.label}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export interface OrderDetailsProps {
  order: Order
}

export function OrderDetails({ order }: OrderDetailsProps) {
  const { status, order_custom_id, items } = order
  const orderTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )
  return (
    <DialogContent className="flex flex-col">
      <DialogHeader>
        <DialogTitle>{order_custom_id}</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col w-full">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <OrderStatus status={status} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="space-y-4">
        <ProductsComboBox />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="text-right">Qtd.</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  {item.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
                <TableCell className="text-right">
                  {(item.price * item.quantity).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total do pedido</TableCell>
              <TableCell className="text-right font-medium">
                {orderTotal.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  )
}
