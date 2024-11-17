import { getUser } from "@/api/queries"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

export const User = () => {
  const { id } = useParams()

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    enabled: Boolean(id),
    queryKey: ["users", id],
    queryFn: () => getUser(String(id)),
  })

  if (isLoading) {
    return <div>Loading user data...</div>
  }

  if (error) {
    return <p className="text-destructive">{error.message}</p>
  }

  if (!user) {
    return <div>Unexpected error. No data was received</div>
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 p-4 rounded-xl border bg-zinc-950">
        <h1 className="font-bold text-2xl">{user.id}</h1>
        <div className="flex flex-col gap-1 text-zinc-500">
          <p>
            Email:{" "}
            <a href={`mailto:${user.email}`} className="underline">
              {user.email}
            </a>
          </p>
        </div>
      </div>
      {/* <Albums userId={user.id} /> */}
    </div>
  )
}