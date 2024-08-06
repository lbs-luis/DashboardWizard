import { LinkProps, Link, useLocation } from 'react-router-dom'

export interface NavLinkProps extends LinkProps {}

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()
  return (
    <Link
      data-current={pathname === props.to}
      className="flex flex-row w-full h-full items-center gap-1.5 text-sm font-medium text-muted hover:text-muted-foreground data-[current=true]:text-foreground"
      {...props}
    />
  )
}
