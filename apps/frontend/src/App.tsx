import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";

import { useAuth } from "./hooks/useAuth";
import { store } from "../store/index";
import { routeTree } from "./routeTree.gen";

import { ThemeProvider } from "@/providers/theme-provider";

const router = createRouter({
  routeTree,
  context: { authentication: undefined! },
});
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
const queryClient = new QueryClient();

function App() {
  const authentication = useAuth();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Provider store={store}>
            <RouterProvider router={router} context={{ authentication }} />
            <Analytics />
          </Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
