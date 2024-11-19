import { getNote } from "@/api/queries"
import { PagesNavigation } from "@/components/common"
import { Textarea } from "@/components/ui"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

export const Note = () => {
  const { id } = useParams()

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    enabled: Boolean(id),
    queryKey: ["notes", id],
    queryFn: () => getNote(String(id)),
  })

  if (isLoading) {
    return <p>Loading note...</p>
  }

  if (error) {
    return <p className="destructive">Error loading note</p>
  }

  if (!note) {
    return <p className="destructive">Can't load note #{id}</p>
  }

  return (
    <div className="flex flex-col gap-4">
      <PagesNavigation noteId={note.id} />
      <h1 className="font-bold text-2xl text-center">{note.name}</h1>
      <Textarea value={note.text} rows={7} readOnly className="mt-2" />
    </div>
  )
}
