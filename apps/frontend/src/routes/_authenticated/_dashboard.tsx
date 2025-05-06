import { createFileRoute, Outlet } from '@tanstack/react-router';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppDrawer from '@/components/app-drawer';

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
        <AppDrawer />
        <main className="w-full   max-w-[1440px] mx-auto euclid">
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  ),
});
