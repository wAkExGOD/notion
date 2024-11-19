import { useNavigate } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import { NoteEntity } from "@/types"
import { NoteManagementButtons } from "./NoteManagementButtons"
import { Button } from "../ui"

type PagesNavigation = {
  noteId?: NoteEntity["id"]
}

export const PagesNavigation: React.FC<PagesNavigation> = ({ noteId }) => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-between gap-2">
      <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
        <ChevronLeft />
      </Button>
      {noteId && <NoteManagementButtons noteId={noteId} />}
    </div>
  )
}
