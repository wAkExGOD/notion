import { Skeleton } from "@/components/ui"

const NOTES_AMOUNT = 4

export const NoteSkeletons = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      {Array.from({ length: NOTES_AMOUNT }, (_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-xl md:h-24" />
      ))}
    </div>
  )
}
