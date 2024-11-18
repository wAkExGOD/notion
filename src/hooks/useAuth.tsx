import { createContext, PropsWithChildren, useContext, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "./useLocalStorage"
import { UserEntity, UserEntityToAuth } from "@/types"
import { routes } from "@/lib/routes"

type AuthContextType = {
  user: UserEntity
  login: (user: UserEntity) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useLocalStorage("user", null)
  const navigate = useNavigate()

  const login = async (user: UserEntityToAuth) => {
    setUser(user)
    navigate(routes.home)
  }

  const logout = () => {
    setUser(null)
    navigate(routes.home, { replace: true })
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext) as AuthContextType
