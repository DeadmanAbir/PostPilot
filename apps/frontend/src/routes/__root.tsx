import { createRootRoute, Outlet } from "@tanstack/react-router";


export const Route = createRootRoute({
  component: () => (
    <>
      <div className="mx-auto container">
        <Outlet />


      </div>
    </>
  ),
});
