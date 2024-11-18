import { getNotes } from "@/api/queries"
import { SORTINGS } from "@/constants/sortings"
import { isSubstring } from "@/lib/isSubstring"
import { NoteEntity, NoteFilters } from "@/types"
import { useQuery } from "@tanstack/react-query"
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { useAuth } from "./useAuth"

export type NotesContextType = {
  isLoading: boolean
  error: Error | null
  filteredNotes: NoteEntity[]
  filterValues: NoteFilters
  setFilterValues: React.Dispatch<React.SetStateAction<NoteFilters>>
  refetchNotes: () => void
}

const NotesContext = createContext<NotesContextType | null>(null)

const NotesProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuth()
  const {
    data: notes,
    isLoading,
    error,
    refetch: refetchNotes,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: () => getNotes(user.id),
  })

  const [filterValues, setFilterValues] = useState<NoteFilters>({
    searchValue: "",
    sorting: SORTINGS.firstNew,
  })
  const [filteredNotes, setFilteredNotes] = useState<NoteEntity[]>([])

  const filters: ((notes: NoteEntity[]) => NoteEntity[])[] = [
    (notes) => {
      const { searchValue } = filterValues

      if (!searchValue) {
        return notes
      }

      return notes.filter((note) => isSubstring(note.name, searchValue))
    },
    (notes) => {
      const { sorting } = filterValues

      let sortFn: (a: NoteEntity, b: NoteEntity) => number

      switch (sorting) {
        case SORTINGS.firstNew:
          sortFn = (a, b) => a.createdAt - b.createdAt
          break
        default:
          sortFn = (a, b) => a.createdAt - b.createdAt
          break
      }

      notes.sort(sortFn)

      return notes
    },
  ]

  useEffect(() => {
    if (!notes) {
      return
    }

    const filteredNotes = filters.reduce(
      (notes, filter) => filter(notes),
      [...notes]
    )

    setFilteredNotes(filteredNotes)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValues, notes])

  return (
    <NotesContext.Provider
      value={{
        isLoading,
        error,
        refetchNotes,
        filterValues,
        filteredNotes,
        setFilterValues,
      }}
    >
      {children}
    </NotesContext.Provider>
  )
}

const useNotes = () => useContext(NotesContext) as NotesContextType

// eslint-disable-next-line react-refresh/only-export-components
export { NotesProvider, useNotes }
