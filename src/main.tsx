import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { routes } from "./lib/routes"
import {
  Error,
  Home,
  LogIn,
  Registration,
  Notes,
  CreateNote,
  EditNote,
  Note,
} from "./pages"
import { RootLayout } from "./components/layouts"
import { ProtectedRoute } from "./components/common"
import "./index.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: 1,
    },
  },
})

const authRoutes = [
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
]

const noteRoutes = [
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
]

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <RootLayout />,
    children: [
      {
        path: routes.home,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      ...authRoutes,
      ...noteRoutes,
      {
        path: routes.notFound,
        element: <Error text="404 Not Found" />,
      },
      {
        path: "*",
        element: <Error text="404 Not Found" />,
      },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
)
