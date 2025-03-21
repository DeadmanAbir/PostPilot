import LinkedInCallback from "@/pages/profile/profileComponents/linkedin-callback";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/linkedin-callback")({
  component: LinkedInCallback,
});
