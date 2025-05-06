import { createFileRoute } from '@tanstack/react-router';

import { Dashboard } from '@/pages/dashboard/dashboard';

export const Route = createFileRoute('/_authenticated/_dashboard/dashboard')({
  component: Dashboard,
});
