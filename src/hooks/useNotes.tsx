import { getNotes } from "@/api/queries"
import { NoteEntity } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { PropsWithChildren, createContext, useContext } from "react"
import { useAuth } from "./useAuth"

export type NotesContextType = {
  isLoading: boolean
  error: Error | null
  refetch: () => void
  notes?: NoteEntity[]
}

const NotesContext = createContext<NotesContextType | null>(null)

const NotesProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuth()
  const {
    data: notes,
    isLoading,
    error,
    refetch,
  } = useQuery({
    enabled: Boolean(user?.id),
    queryKey: ["notes"],
    queryFn: () => getNotes(user?.id),
  })

  return (
    <NotesContext.Provider
      value={{
        isLoading,
        error,
        notes,
        refetch,
      }}
    >
      {children}
    </NotesContext.Provider>
  )
}

const useNotes = () => useContext(NotesContext) as NotesContextType

// eslint-disable-next-line react-refresh/only-export-components
export { NotesProvider, useNotes }
