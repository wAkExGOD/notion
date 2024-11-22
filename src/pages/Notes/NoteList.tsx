import { useNotes } from "@/hooks/useNotes"
import { NoteSkeletons } from "./NoteSkeletons"
import { Note } from "./Note"

export const NoteList = () => {
  const { error, isLoading, notes } = useNotes()

  if (isLoading) {
    return <NoteSkeletons />
  }

  if (error) {
    return <p className="text-red-500">{error.message}</p>
  }

  if (!notes) {
    return <p className="text-red-500">Can't get notes</p>
  }

  return (
    <div className="flex flex-col w-full gap-2">
      {notes
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((note) => (
          <Note key={note.id} data={note} />
        ))}
    </div>
  )
}
