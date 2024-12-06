import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "./useLocalStorage"
import { UserEntity } from "@/types"
import { routes } from "@/lib/routes"
import { useQuery } from "@tanstack/react-query"
import { getUser } from "@/api/queries"

type AuthContextType = {
  user?: UserEntity | null
  isLoading: boolean
  login: (user: UserEntity) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [userId, setUserId] = useLocalStorage("userId", null)
  const [willRedirect, setWillRedirect] = useState(false)
  const navigate = useNavigate()

  const { data: user, isLoading } = useQuery({
    enabled: Boolean(userId),
    queryKey: ["user", userId],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      try {
        const user = await getUser(userId)

        if (!user) {
          setUserId(null)

          return null
        }

        if (willRedirect) {
          navigate(routes.home)
        }

        return user
      } catch {
        setUserId(null)

        return null
      }
    },
  })

  const login = async (user: UserEntity) => {
    setUserId(user.id)
    setWillRedirect(true)
  }

  const logout = () => {
    setUserId(null)
    navigate(routes.logIn)
  }

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login,
      logout,
    }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext) as AuthContextType
