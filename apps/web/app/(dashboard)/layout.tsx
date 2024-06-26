import type { PropsWithChildren } from 'react'

import Link from 'next/link'

import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Button } from '@lr/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@lr/ui/sheet'
import { Menu, Package2 } from 'lucide-react'

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="bg-background sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            href="#"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            className="text-foreground hover:text-foreground transition-colors"
            href="#"
          >
            Workspaces
          </Link>
          <Link
            className="text-muted-foreground hover:text-foreground transition-colors"
            href="#"
          >
            Orders
          </Link>
          <Link
            className="text-muted-foreground hover:text-foreground transition-colors"
            href="#"
          >
            Products
          </Link>
          <Link
            className="text-muted-foreground hover:text-foreground transition-colors"
            href="#"
          >
            Customers
          </Link>
          <Link
            className="text-muted-foreground hover:text-foreground transition-colors"
            href="#"
          >
            Analytics
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="shrink-0 md:hidden"
              size="icon"
              variant="outline"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                className="flex items-center gap-2 text-lg font-semibold"
                href="#"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">LR Inc</span>
              </Link>
              <Link className="hover:text-foreground" href="#">
                Dashboard
              </Link>
              <Link
                className="text-muted-foreground hover:text-foreground"
                href="#"
              >
                Orders
              </Link>
              <Link
                className="text-muted-foreground hover:text-foreground"
                href="#"
              >
                Products
              </Link>
              <Link
                className="text-muted-foreground hover:text-foreground"
                href="#"
              >
                Customers
              </Link>
              <Link
                className="text-muted-foreground hover:text-foreground"
                href="#"
              >
                Analytics
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center justify-end md:ml-auto">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <SignedIn>{children}</SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </main>
    </div>
  )
}

export default DashboardLayout
