import { TableCell, TableRow } from '@/components/ui/table'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'

export interface ProductTableRowProps {
  product: {
    productId: string
    productName: string
    productDescription: string
    totalInCents: number
    createdAt: string
  }
}

export function ProductTableRow({ product }: ProductTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-mono text-xs font-medium">
        {product.productId}
      </TableCell>
      <TableCell className="font-medium">{product.productName}</TableCell>
      <TableCell className="font-medium">
        {product.productDescription}
      </TableCell>
      <TableCell className="font-medium">
        {(product.totalInCents / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(product.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
    </TableRow>
  )
}
