import { Navigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { PropsWithChildren } from "react"
import { routes } from "@/lib/routes"

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const auth = useAuth()

  if (!auth?.user) {
    return <Navigate to={routes.logIn} />
  }

  return children
}
