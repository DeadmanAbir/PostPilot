import Sources from "@/pages/sources/sources";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_dashboard/sources")({
  component: Sources,
});
