import { ScheduledPostsPage } from "@/pages/scheduled/scheduled-posts-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/scheduled")({
  component: ScheduledPostsPage,
});
