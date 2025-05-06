import { createFileRoute } from '@tanstack/react-router';

import Accounts from '@/pages/accounts/accounts';

export const Route = createFileRoute('/_authenticated/_dashboard/integration')({
  component: Accounts,
});
