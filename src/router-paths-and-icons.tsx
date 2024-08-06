import { Book, Home, PackageSearch, Package } from 'lucide-react'

type Pages = Record<string, string>
type Icons = Record<string, JSX.Element>

const pages: Pages = {
  '/': 'Dashboard',
  '/sales': 'Vendas',
  '/products': 'Produtos',
  '/orders': 'Comandas',
}
const icons: Icons = {
  '/': <Home className="h-4 w-4" />,
  '/sales': <PackageSearch className="h-4 w-4" />,
  '/products': <Package className="h-4 w-4" />,
  '/orders': <Book className="h-4 w-4" />,
}

export { pages, icons }
