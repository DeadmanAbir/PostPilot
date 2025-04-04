import { getProfileData } from "@/lib/api";
import { supabase } from "@/lib/supabaseClient";
import { ProfilePage } from "@/pages/profile/profile-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
  loader: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const data = await getProfileData(session?.access_token!);
    return data.users[0];
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: ({ error }) => <div>Error: {error.message}</div>,
});
