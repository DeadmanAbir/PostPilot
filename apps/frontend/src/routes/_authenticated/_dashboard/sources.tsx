import { createFileRoute } from "@tanstack/react-router";

import Sources from "@/pages/sources/sources";

export const Route = createFileRoute("/_authenticated/_dashboard/sources")({
  component: Sources,
});
