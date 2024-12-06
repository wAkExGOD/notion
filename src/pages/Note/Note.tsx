import { getNote } from "@/api/queries"
import { PagesNavigation } from "@/components/common"
import { Heading, Textarea } from "@/components/ui"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "@/hooks/useToast"
import { routes } from "@/lib/routes"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const Note = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    enabled: Boolean(id),
    queryKey: ["notes", id],
    queryFn: () => getNote(String(id)),
  })

  useEffect(() => {
    if (error) {
      return navigate(routes.notFound, { replace: true })
    }

    if (!note || !user) {
      return
    }

    if (note.userId !== user.id) {
      navigate(routes.notes.root)

      toast({
        title: "You don't have permission to access this note",
        variant: "destructive",
      })
    }
  }, [note, error])

  if (isLoading) {
    return <p>Loading note...</p>
  }

  if (!note) {
    return <p className="text-red-500">Can't load note #{id}</p>
  }

  return (
    <div className="flex flex-col gap-4">
      <PagesNavigation noteId={note.id} />
      <Heading>{note.name}</Heading>
      {note.text && (
        <Textarea value={note.text} rows={7} readOnly className="mt-2" />
      )}
    </div>
  )
}
