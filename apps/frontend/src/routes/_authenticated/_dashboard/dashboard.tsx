import { Dashboard } from "@/pages/dashboard/dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_dashboard/dashboard")({
  component: Dashboard,
});
