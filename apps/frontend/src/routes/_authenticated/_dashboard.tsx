import Sidebar from '@/components/sidebar'
import Toggle from '@/components/sidebar/toggle'
import { Header } from '@/pages/dashboard/dashboardComponents/header'
import { createFileRoute, Outlet} from '@tanstack/react-router'

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
      <Sidebar />
      <div className="mx-auto container">
      <Header />
        <Outlet />
        <div className="fixed bottom-0 left-5 ">
        <Toggle/>
        </div>

      </div>
    </>
  ),
})