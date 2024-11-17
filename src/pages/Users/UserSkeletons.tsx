import { Skeleton } from "@/components/ui"

const USERS_AMOUNT = 4

export const UserSkeletons = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: USERS_AMOUNT }, (_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-xl" />
      ))}
    </div>
  )
}
