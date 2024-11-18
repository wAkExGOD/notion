import { Button } from "@/components/ui"
import { Link } from "react-router-dom"
import { routes } from "@/lib/routes"
import { NoteSkeletons } from "./NoteSkeletons"
import { Note } from "./Note"
import { useNotes } from "@/hooks/useNotes"

export const Notes = () => {
  const { error, isLoading, filteredNotes } = useNotes()

  if (isLoading) {
    return <NoteSkeletons />
  }

  if (error) {
    return <p className="text-destructive">{error.message}</p>
  }

  if (!filteredNotes) {
    return <p className="text-destructive">Can't get notes</p>
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="font-bold text-2xl">Notes</h1>
      <Link to={routes.notes.create}>
        <Button>Create note</Button>
      </Link>
      <div className="flex flex-col w-full gap-2">
        {filteredNotes.map((note) => (
          <Note key={note.id} data={note} />
        ))}
      </div>
    </div>
  )
}
