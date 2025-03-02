import sources from "@/components/sources";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sources")({
  component: sources,
});
