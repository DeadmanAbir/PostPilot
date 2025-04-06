import Posted from "@/pages/posted/postPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_dashboard/posted")({
  component: Posted,
});
