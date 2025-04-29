import { createFileRoute } from "@tanstack/react-router";

import HomePage from "@/pages/homepage/homePage";

export const Route = createFileRoute("/")({
  component: HomePage,
});
