export const useAuth = () => {
  const signIn = () => {
    localStorage.setItem("isAuthenticated", "true");
  };

  const signOut = () => {
    localStorage.removeItem("isAuthenticated");
  };

  const isLogged = () => true;

  return { signIn, signOut, isLogged };
};

export type AuthContext = ReturnType<typeof useAuth>;
