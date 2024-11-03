import { Separator } from '@/components/ui/separator'
import { ReactNode } from 'react'

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { cookies } from 'next/headers'
import { BreadcrumbHeader } from '@/components/breadcrumbHeader'
import { ModeToggle } from '@/components/modeToggle'
import { SignedIn, UserButton } from '@clerk/nextjs'

export default async function layout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col">
          <header className="flex items-center px-6 py-4 h-[50px] justify-between container mx-auto">
            <div className="flex gap-2">
              <SidebarTrigger />
              <BreadcrumbHeader />
            </div>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          <Separator />
          <div className="overflow-auto">
            <div className="flex-1 container py-4 text-accent-foreground mx-auto px-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
