import { AppSidebar } from '@/components/app-sidebar'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Header } from '@/pages/dashboard/dashboardComponents/header'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_dashboard')({

  component: () => (
    <>
      {/* <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr /> */}
      <SidebarProvider>
        <AppSidebar />
        <main className='w-full '>
          <SidebarTrigger />
          <Header/>
          <Outlet />
        </main>
      </SidebarProvider>


    </>
  ),
})

