import OnboardPage from "@/pages/onboard/onboardingPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/onboard")({
  component: OnboardPage,
});
