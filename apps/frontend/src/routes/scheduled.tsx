import { ScheduledPostsPage } from "@/components/scheduled/scheduled-posts-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scheduled")({
  component: ScheduledPostsPage,
});
