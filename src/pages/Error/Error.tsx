import { Link, useRouteError } from "react-router-dom"
import { getErrorMessage } from "./errorMessage"
import { routes } from "@/lib/routes"
import { Button, Heading } from "@/components/ui"
import { useAuth } from "@/hooks/useAuth"

type ErrorProps = {
  text?: string
}

export const Error: React.FC<ErrorProps> = ({ text }) => {
  const { user } = useAuth()
  const error = useRouteError()
  const errorMessage = getErrorMessage(error)

  const errorText = text || errorMessage || "Oops! Error"

  return (
    <div className="flex flex-col items-center justify-center py-[30vh]">
      <div className="flex flex-col items-center gap-10">
        <Heading className="text-6xl">{errorText}</Heading>
        {user && (
          <Link to={routes.home}>
            <Button size="lg" variant="secondary">
              Home page
            </Button>
          </Link>
        )}
        {!user && (
          <Link to={routes.logIn}>
            <Button size="lg" variant="secondary">
              Log in
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
