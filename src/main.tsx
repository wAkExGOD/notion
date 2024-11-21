import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  Error,
  Root,
  Home,
  LogIn,
  Registration,
  Notes,
  CreateNote,
  EditNote,
  Note,
} from "./pages"
import { routes } from "./lib/routes"
import "./index.css"
import { ProtectedRoute } from "./components/common"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: 1,
    },
  },
})

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <Root />,
    children: [
      {
        path: routes.logIn,
        element: <LogIn />,
        errorElement: <Error />,
      },
      {
        path: routes.registration,
        element: <Registration />,
        errorElement: <Error />,
      },
      {
        path: routes.home,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: routes.notes.root,
        element: (
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: routes.notes.template,
        element: (
          <ProtectedRoute>
            <Note />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: routes.notes.create,
        element: (
          <ProtectedRoute>
            <CreateNote />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: routes.notes.edit.template,
        element: (
          <ProtectedRoute>
            <EditNote />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
)
