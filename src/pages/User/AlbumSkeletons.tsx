import { Skeleton } from "@/components/ui"
import { cn } from "@/lib/utils"

const ALBUMS_AMOUNT = 6

export const AlbumSkeletons = () => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {Array.from({ length: ALBUMS_AMOUNT }, (_, i) => (
        <div key={i} className="flex flex-col gap-2 p-4 rounded-xl border">
          <Skeleton className={cn("h-6 w-3/5", i % 2 === 0 && "w-4/5")} />
          <Skeleton className="h-4 w-6" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  )
}
