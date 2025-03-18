import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "../providers/theme-provider";
import { Provider } from "react-redux";
import { store } from "../store/index";
import { useAuth } from "./hooks/useAuth";
const router = createRouter({
  routeTree,
  context: { authentication: undefined! },
});
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const authentication = useAuth();

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Provider store={store}>
          <RouterProvider router={router} context={{ authentication }} />
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
