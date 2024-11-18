import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Error, Root, Home, LogIn, Registration, Notes } from "./pages";
import { routes } from "./lib/routes";
import "./index.css";
import { ProtectedRoute } from "./components/common";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: 1,
    },
  },
});

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: routes.home,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: routes.logIn,
        element: <LogIn />,
      },
      {
        path: routes.registration,
        element: <Registration />,
      },
      {
        path: routes.notes.root,
        element: (
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
