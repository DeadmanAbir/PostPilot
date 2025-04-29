import { createFileRoute } from "@tanstack/react-router";

import { ScheduledPostsPage } from "@/pages/scheduled/scheduled-posts-page";

export const Route = createFileRoute("/_authenticated/_dashboard/scheduled")({
  component: ScheduledPostsPage,
});
