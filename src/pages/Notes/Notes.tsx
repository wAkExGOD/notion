import { Button, Heading } from "@/components/ui"
import { Link } from "react-router-dom"
import { routes } from "@/lib/routes"
import { NoteList } from "./NoteList"

export const Notes = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Heading>Notes</Heading>
      <Link to={routes.notes.create}>
        <Button>Create note</Button>
      </Link>
      <NoteList />
    </div>
  )
}
