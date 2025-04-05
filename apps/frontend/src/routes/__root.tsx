import { AuthContext } from "@/hooks/useAuth";
import NotFoundPage from "@/pages/notfound";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

type RouterContext = {
  authentication: AuthContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
    </>
  ),
  notFoundComponent: () => (<>
  <NotFoundPage/>
  </>
  )
});
