import { Button, Heading } from "@/components/ui"
import { useAuth } from "@/hooks/useAuth"
import { formatDate } from "@/lib/formatDate"
import { routes } from "@/lib/routes"
import { Link } from "react-router-dom"
import { UserSkeleton } from "./UserSkeleton"

export const Home = () => {
  const { user } = useAuth()

  return (
    <div className="flex flex-col gap-4">
      <Heading>About me</Heading>
      {user ? (
        <>
          <ul className="flex flex-col gap-2">
            <li className="space-x-1">
              <b>Email:</b>
              <span>{user.email}</span>
            </li>
            <li className="space-x-1">
              <b>Date sign up:</b>
              <span>{formatDate(user.createdAt)}</span>
            </li>
          </ul>
          <Link to={routes.notes.root}>
            <Button>Go to Notes</Button>
          </Link>
        </>
      ) : (
        <UserSkeleton />
      )}
    </div>
  )
}
