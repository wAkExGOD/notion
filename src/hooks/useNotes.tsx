import { getNotes } from "@/api/queries"
import { SORTINGS } from "@/constants/sortings"
import { isSubstring } from "@/lib/isSubstring"
import { NoteEntity, NoteFilters } from "@/types"
import { useQuery } from "@tanstack/react-query"
import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react"

export type NotesContextType = {
  isLoading: boolean
  error: Error | null
  filteredNotes: NoteEntity[]
  filterValues: NoteFilters
  setFilterValues: React.Dispatch<React.SetStateAction<NoteFilters>>
}

const NotesContext = createContext<NotesContextType | null>(null)

const NotesProvider = ({ children }: PropsWithChildren) => {
  const {
    data: notes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  })

  const [filterValues, setFilterValues] = useState<NoteFilters>({
    searchValue: "",
    sorting: SORTINGS.firstNew,
  })

  const filters: ((notes: NoteEntity[]) => NoteEntity[])[] = [
    (notes) => {
      const { searchValue } = filterValues

      return notes.filter((note) => isSubstring(note.title, searchValue))
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
  ] as const

  const filteredNotes = useMemo(() => {
    if (!notes) {
      return []
    }

    return filters.reduce((notes, filter) => filter(notes), [...notes])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValues])

  return (
    <NotesContext.Provider
      value={{
        isLoading,
        error,
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

export { NotesProvider, useNotes }
