import { Link, useRouteError } from "react-router-dom"
import { getErrorMessage } from "./errorMessage"
import { routes } from "@/lib/routes"
import { Button } from "@/components/ui"

export const Error = () => {
  const error = useRouteError()
  const errorMessage = getErrorMessage(error)

  return (
    <div className="h-[100dvh] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-10">
        <h1 className="font-bold text-6xl text-center">{errorMessage || "Oops! Error"}</h1>
        <Link to={routes.home}>
          <Button size="lg" variant="secondary">
            Home page
          </Button>
        </Link>
      </div>
    </div>
  )
}
