import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "@/providers/theme-provider";
import { Provider } from "react-redux";
import { store } from "../store/index";
import { useAuth } from "./hooks/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";

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
      <Helmet>
        <title>PostPilot</title>
        <meta name="description" content="PostPilot - The best way to manage your posts and campaigns." />
        <meta property="og:title" content="PostPilot" />
        <meta property="og:description" content="PostPilot - The best way to manage your posts and campaigns." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://post-pilot-beta.vercel.app/" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PostPilot" />
        <meta name="twitter:description" content="PostPilot - The best way to manage your posts and campaigns." />
        <meta name="twitter:image" content="/og-image.png" />
      </Helmet>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Provider store={store}>
            <RouterProvider router={router} context={{ authentication }} />
          </Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
