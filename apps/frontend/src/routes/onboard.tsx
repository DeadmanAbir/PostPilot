import { createFileRoute, redirect } from '@tanstack/react-router';

import { supabase } from '@/lib/supabaseClient';
import OnboardPage from '@/pages/onboard/onboardingPage';

export const Route = createFileRoute('/onboard')({
  beforeLoad: async ({ location }) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.access_token || session?.user) {
      throw redirect({
        to: '/dashboard',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: OnboardPage,
});
