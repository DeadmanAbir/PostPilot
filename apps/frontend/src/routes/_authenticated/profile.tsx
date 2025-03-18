import { ProfilePage } from "@/pages/profile/profile-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});
