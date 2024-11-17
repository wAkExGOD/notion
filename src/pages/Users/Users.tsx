import { getUsers } from "@/api/queries"
import { useQuery } from "@tanstack/react-query"
import { UserSkeletons } from "./UserSkeletons"
import { User } from "./User"

export const Users = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  })

  if (isLoading) {
    return <UserSkeletons />
  }

  if (error) {
    return <p className="text-destructive">{error.message}</p>
  }

  if (!users) {
    return <p className="text-destructive">Can't get users</p>
  }

  return (
    <div className="flex flex-col gap-2">
      {users.map((user) => (
        <User key={user.id} data={user} />
      ))}
    </div>
  )
}
