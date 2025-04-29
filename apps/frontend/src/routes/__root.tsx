import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import { AuthContext } from "@/hooks/useAuth";
import NotFoundPage from "@/pages/notfound";
import { Toaster } from "@/components/ui/sonner";

type RouterContext = {
  authentication: AuthContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      <Toaster />
    </>
  ),
  notFoundComponent: () => (
    <>
      <NotFoundPage />
    </>
  ),
});
