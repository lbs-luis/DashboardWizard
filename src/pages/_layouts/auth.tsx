import { Outlet } from 'react-router-dom'
import { Wand2 } from 'lucide-react'

export function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-2 antialised">
      <div className="hidden justify-between h-full border-r border-foreground/5 bg-muted/5 text-muted-foreground md:flex flex-col p-10">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <Wand2 className="h-5 w-5" />
          <span className="font-semibold">Dashboard.Wizard</span>
        </div>
        <footer className="text-sm">
          Painel do parceiro &copy; Dashboard.Wizard -{' '}
          {new Date().getFullYear()}
        </footer>
      </div>

      <div className="flex flex-col items-center justify-center w-screen md:w-auto relative">
        <Outlet />

        <footer className="md:hidden text-sm absolute bottom-2">
          Painel do parceiro &copy; Dashboard.Wizard -{' '}
          {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  )
}
