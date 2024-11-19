import { Link } from "react-router-dom"
import { Card } from "@/components/ui"
import { NoteManagementButtons } from "@/components/common"
import { formatDate } from "@/lib/formatDate"
import { NoteEntity } from "@/types"
import { routes } from "@/lib/routes"

type NoteProps = {
  data: NoteEntity
}

export const Note: React.FC<NoteProps> = ({ data }) => {
  const { id, name, createdAt } = data

  return (
    <Card className="flex flex-row items-center gap-4">
      <div className="flex flex-col gap-2">
        <Link to={routes.notes._create(id)}>
          <h2 className="font-medium text-xl">{name}</h2>
        </Link>
        <span className="text-gray-500">{formatDate(createdAt, false)}</span>
      </div>
      <NoteManagementButtons noteId={id} />
    </Card>
  )
}
