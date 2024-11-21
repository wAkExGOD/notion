import { Link, useRouteError } from "react-router-dom"
import { getErrorMessage } from "./errorMessage"
import { routes } from "@/lib/routes"
import { Button, Heading } from "@/components/ui"

export const Error = () => {
  const error = useRouteError()
  const errorMessage = getErrorMessage(error)

  return (
    <div className="h-[100dvh] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-10">
        <Heading className="text-6xl">
          {errorMessage || "Oops! Error"}
        </Heading>
        <Link to={routes.home}>
          <Button size="lg" variant="secondary">
            Home page
          </Button>
        </Link>
      </div>
    </div>
  )
}
