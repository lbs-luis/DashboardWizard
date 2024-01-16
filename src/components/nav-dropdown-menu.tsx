import { Link, useLocation } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { ChevronDown, Home, PackageSearch } from 'lucide-react'

export function NavDropDownMenu() {
  const { pathname } = useLocation()
  type Pages = Record<string, string>
  const pages: Pages = { '/': 'Dashboard', '/sales': 'Vendas' }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 select-none"
        >
          {pages[pathname]}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem>
          <Link
            to="/"
            className={`flex flex-row gap-2 ${
              pathname === '/' ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            <Home className="h-4 w-4" />
            Início
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to="/sales"
            className={`flex flex-row gap-2 ${
              pathname === '/sales'
                ? 'text-foreground'
                : 'text-muted-foreground'
            }`}
            data-current={pathname === '/sales'}
          >
            <PackageSearch className="h-4 w-4" />
            Vendas
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
