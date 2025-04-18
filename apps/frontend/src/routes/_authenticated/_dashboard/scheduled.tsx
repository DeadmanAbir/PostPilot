import { ScheduledPostsPage } from "@/pages/scheduled/scheduled-posts-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_dashboard/scheduled")({
  component: ScheduledPostsPage,
});
