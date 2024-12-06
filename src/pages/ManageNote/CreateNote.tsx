import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { createNote as createNoteMutation } from "@/api/mutations"
import { useAuth } from "@/hooks/useAuth"
import { NoteForm, NoteFormValues } from "./NoteForm"
import { useNotes } from "@/hooks/useNotes"
import { toast } from "@/hooks/useToast"
import { routes } from "@/lib/routes"

export const CreateNote = () => {
  const { user } = useAuth()
  const { refetch: refetchNotes } = useNotes()
  const navigate = useNavigate()

  const { mutate: createNote, isPending } = useMutation({
    mutationFn: createNoteMutation,
    onSuccess: (note) => {
      toast({
        title: "You have successfully created a note",
      })

      refetchNotes()

      navigate(routes.notes._create(note.id))
    },
    onError: (error) =>
      toast({
        title: "Note creation failed",
        description: error.message,
        variant: "destructive",
      }),
  })

  const handleSubmit = (note: NoteFormValues) => {
    if (!user) {
      return
    }

    createNote({
      ...note,
      userId: user.id,
    })
  }

  return <NoteForm onSubmit={handleSubmit} processing={isPending} />
}
