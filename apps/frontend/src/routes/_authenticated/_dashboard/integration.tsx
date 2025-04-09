import Accounts from "@/pages/accounts/accounts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_dashboard/integration")({
  component: Accounts,
});
