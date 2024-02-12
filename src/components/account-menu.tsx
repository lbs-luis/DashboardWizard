import { Building, ChevronDown, LogOut } from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useMutation, useQuery } from '@tanstack/react-query'
// import { getProfile } from '@/api/get-profile'
// import { getManagedStore } from '@/api/get-managed-store'
import { Skeleton } from './ui/skeleton'
import { Dialog, DialogTrigger } from './ui/dialog'
// import { StoreProfileDialog } from './store-profile-dialog'
import { signOut } from '@/api/sign-out'
import { useNavigate } from 'react-router-dom'
import { connectToApi } from '@/api/connect-to-api'

export function AccountMenu() {
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['connect'],
    queryFn: connectToApi,
  })

  console.log(data)

  // const { data: profile, isLoading: isProfileLoading } = useQuery({
  //   queryKey: ['profile'],
  //   queryFn: getProfile,
  // })

  // const { data: managedStore, isLoading: isManagedStoreLoading } = useQuery({
  //   queryKey: ['managed-store'],
  //   queryFn: getManagedStore,
  //   staleTime: Infinity,
  // })

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate('/sign-in', { replace: true })
    },
  })

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 select-none"
          >
            <Skeleton className="h-4 w-10" />
            {/* {isManagedStoreLoading ? (
              <Skeleton className="h-4 w-10" />
            ) : (
              managedStore?.name
            )} */}
            <ChevronDown className="h-4 w-10" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {/* {isProfileLoading ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {profile?.email}
                </span>
              </>
            )} */}
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="w-4 h-4 mr-2" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            className="text-rose-500 dark:text-rose-400"
            asChild
            disabled={isSigningOut}
          >
            <button className="w-full" onClick={() => signOutFn()}>
              <LogOut className="w-4 h-4 mr-2" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <StoreProfileDialog /> */}
    </Dialog>
  )
}
