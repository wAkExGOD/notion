import { Skeleton } from "@/components/ui"

export const UserSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Skeleton className="h-5 w-40 rounded-md" />
      <Skeleton className="h-4 w-56 rounded-md" />
      <Skeleton className="h-10 w-28 rounded-md" />
    </div>
  )
}
