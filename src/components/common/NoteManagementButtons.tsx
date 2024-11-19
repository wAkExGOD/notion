import { Link } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { Delete, Edit2 } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@/components/ui"
import { useNotes } from "@/hooks/useNotes"
import { toast } from "@/hooks/useToast"
import { deleteNote as deleteNoteMutation } from "@/api/mutations"
import { NoteEntity } from "@/types"
import { routes } from "@/lib/routes"

type NoteManagementButtonsProps = {
  noteId: NoteEntity["id"]
}

export const NoteManagementButtons: React.FC<NoteManagementButtonsProps> = ({
  noteId,
}) => {
  const { refetchNotes } = useNotes()

  const { mutate: deleteNote } = useMutation({
    mutationFn: deleteNoteMutation,
    onSuccess: () => {
      toast({
        title: `You have successfully deleted note #${noteId}`,
      })

      refetchNotes()
    },
    onError: (error) =>
      toast({
        title: "Registration failed. Please try again later",
        description: error.message,
        variant: "destructive",
      }),
  })

  return (
    <div className="ml-auto flex gap-2">
      <Link to={routes.notes.edit._create(noteId)}>
        <Button size="icon" variant="secondary">
          <Edit2 />
        </Button>
      </Link>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button size="icon" variant="secondary">
            <Delete />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              note.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteNote(noteId)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
