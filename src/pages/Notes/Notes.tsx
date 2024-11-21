import { Button, Heading } from "@/components/ui"
import { Link } from "react-router-dom"
import { routes } from "@/lib/routes"
import { useNotes } from "@/hooks/useNotes"
import { NoteSkeletons } from "./NoteSkeletons"
import { Note } from "./Note"

export const Notes = () => {
  const { error, isLoading, notes } = useNotes()

  if (error) {
    return <p className="text-red-500">{error.message}</p>
  }

  if (!notes && isLoading) {
    return <p className="text-red-500">Can't get notes</p>
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Heading>Notes</Heading>
      <Link to={routes.notes.create}>
        <Button>Create note</Button>
      </Link>
      {isLoading && <NoteSkeletons />}
      {!isLoading && notes && (
        <div className="flex flex-col w-full gap-2">
          {notes
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((note) => (
              <Note key={note.id} data={note} />
            ))}
        </div>
      )}
    </div>
  )
}
