import { deleteNote as deleteNoteMutation } from "@/api/mutations"
import { Button, Card } from "@/components/ui"
import { useNotes } from "@/hooks/useNotes"
import { toast } from "@/hooks/useToast"
import { formatDate } from "@/lib/formatDate"
import { routes } from "@/lib/routes"
import { NoteEntity } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { Delete, Edit2 } from "lucide-react"
import { Link } from "react-router-dom"

type NoteProps = {
  data: NoteEntity
}

export const Note: React.FC<NoteProps> = ({ data }) => {
  const { refetchNotes } = useNotes()

  const { id, name, createdAt } = data

  const { mutate: deleteNote } = useMutation({
    mutationFn: deleteNoteMutation,
    onSuccess: () => {
      toast({
        title: `You have successfully deleted note #${id}`,
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

  const handleDelete = () => {
    // ... delete
    deleteNote(id)
  }

  return (
    <Card className="flex flex-row items-center gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="font-medium text-xl">{name}</h2>
        <span className="text-gray-500">{formatDate(createdAt, false)}</span>
      </div>
      <div className="ml-auto flex gap-2">
        <Link to={routes.notes.edit.create(id)}>
          <Button size="icon" variant="secondary">
            <Edit2 />
          </Button>
        </Link>
        <Button size="icon" variant="secondary" onClick={handleDelete}>
          <Delete />
        </Button>
      </div>
    </Card>
  )
}
