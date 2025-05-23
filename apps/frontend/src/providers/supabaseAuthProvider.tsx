import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

import { supabase } from '@/lib/supabaseClient';

type AuthUser = {
  user: User | null;
  accessToken: string | null;
};

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
};
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Get initial session
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setUser({
          user: session?.user ?? null,
          accessToken: session?.access_token ?? null,
        });
        setLoading(false); // Set loading to false after initial session check
      })
      .catch(() => {
        setLoading(false); // also set loading to false in case of error.
      });

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // console.log("onAuthStateChange", session);
        setUser({
          user: session?.user ?? null,
          accessToken: session?.access_token ?? null,
        });
        setLoading(false); // Set loading to false after auth state change
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const value = { user, loading }; // Include loading in context value

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
