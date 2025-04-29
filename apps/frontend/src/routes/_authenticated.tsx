import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { supabase } from "@/lib/supabaseClient";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token || !session.user) {
      throw redirect({
        to: "/onboard",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
