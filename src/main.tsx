import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Error, Root, Users, LogIn, Registration } from "./pages"
import { routes } from "./lib/routes"
import "./index.css"

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
    errorElement: <Error />,
    children: [
      {
        path: routes.logIn,
        element: <LogIn />,
      },
      {
        path: routes.registration,
        element: <Registration />,
      },
      {
        path: routes.home,
        element: <Users />,
      },
      // {
      //   path: routes.users.user.template,
      //   element: <User />,
      // },
      {
        path: routes.users.root,
        element: <Users />,
      },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
)
