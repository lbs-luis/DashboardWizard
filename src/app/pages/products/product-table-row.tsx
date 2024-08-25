import { deleteProduct } from '@/api/products/delete-product'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { useMutation } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { Product } from '@/api/products/get-products'

export interface ProductTableRowProps {
  product: Product
}

export function ProductTableRow({ product }: ProductTableRowProps) {
  const [open, setOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState({
    name: '',
    id: '',
  })

  const { mutateAsync: _deleteProduct } = useMutation({
    mutationFn: deleteProduct,
  })

  async function handleDeleteProduct(product_custom_id: string) {
    await _deleteProduct({ product_custom_id })
      .then((_) => toast.success('Produto deletado'))
      .catch((error) => toast.error(error.message))
  }

  return (
    <>
      <TableRow>
        <TableCell className="font-mono text-sm font-medium">
          {product.product_custom_id}
        </TableCell>
        <TableCell className="font-mono text-sm font-medium">
          {product.bar_code}
        </TableCell>
        <TableCell className="font-medium">{product.name}</TableCell>
        <TableCell className="font-medium">{product.description}</TableCell>
        <TableCell className="font-medium">{product.condicaoDeUso}</TableCell>
        <TableCell className="font-medium">
          {product.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </TableCell>
        <TableCell className="font-medium">{product.quantity}</TableCell>
        <TableCell className="flex justify-center">
          <Button
            onClick={() => {
              setProductToDelete({
                id: product.product_custom_id,
                name: product.name,
              })
              setOpen(true)
            }}
            variant="outline"
            size="xs"
            className="hover:text-white hover:border-rose-500 hover:bg-rose-500"
          >
            <Trash2 strokeWidth={2} className="w-5 h-5" />
          </Button>
        </TableCell>
      </TableRow>

      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row gap-1">
              Deseja <p className="text-rose-500">excluir</p>este produto?
            </DialogTitle>
            <DialogDescription>
              Confirmando a exclusão de {productToDelete.name} todo seu
              histórico de movimentação também será perdido.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-row gap-2 w-fit place-self-end">
            <Button
              variant="outline"
              className="hover:text-rose-500 hover:border-rose-500 hover:bg-transparent w-16"
              onClick={() => {
                handleDeleteProduct(productToDelete.id)
                setOpen(false)
              }}
            >
              sim
            </Button>
            <Button
              variant="destructive"
              className="w-20"
              onClick={() => setOpen(false)}
            >
              não
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
