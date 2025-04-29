import { createFileRoute } from "@tanstack/react-router";

import Posted from "@/pages/posted/postPage";

export const Route = createFileRoute("/_authenticated/_dashboard/posted")({
  component: Posted,
});
