import Sidebar from "../components/sidebar/index";
import { createRootRoute,  Outlet } from "@tanstack/react-router";
import { Header } from "@/pages/dashboard/dashboardComponents/header";
import Toggle from "@/components/sidebar/toggle";

export const Route = createRootRoute({
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
});
