import { Home, PackageSearch, Wand2 } from 'lucide-react'
import { Separator } from './ui/separator'
import { NavLink } from './nav-link'
import { ModeToggle } from './theme/mode-toggle'
import { AccountMenu } from './account-menu'
import { NavDropDownMenu } from './nav-dropdown-menu'
import { icons, pages } from '@/router-paths-and-icons'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-2 md:gap-6 px-6">
        <Wand2 className="h-6 w-6" />

        <Separator orientation="vertical" className="h-6" />

        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {Object.keys(pages).map((page, i) => (
            <NavLink to={page} key={`header-link-${i}`}>
              {icons[page]}
              {pages[page]}
            </NavLink>
          ))}
        </nav>
        <div className="md:hidden">
          <NavDropDownMenu />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
