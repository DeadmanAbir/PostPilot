import { Container } from "@/components/container";
import Sidebar from "../components/sidebar/index";
import { createRootRoute,  Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Header } from "@/pages/dashboard/dashboardComponents/header";

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
      <Container>
      <Header />
        <Outlet />

      </Container>
      <TanStackRouterDevtools />
    </>
  ),
});
