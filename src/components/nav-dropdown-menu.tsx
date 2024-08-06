import { Link, useLocation } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { ChevronDown } from 'lucide-react'
import { NavLink } from './nav-link'
import { icons, pages } from '@/router-paths-and-icons'

export function NavDropDownMenu() {
  const { pathname } = useLocation()

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
        {Object.keys(pages).map((page, i) => (
          <DropdownMenuItem>
            <NavLink to={page} key={`mobile-link-${i}`}>
              {icons[page]}
              {pages[page]}
            </NavLink>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
