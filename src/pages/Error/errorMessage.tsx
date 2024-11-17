import { isRouteErrorResponse } from "react-router-dom"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface RouterError extends Error {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isRouterError(object: any): object is RouterError {
  return "message" in object
}

export function getErrorMessage(error: unknown): string {
  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`
  } else if (error != undefined && isRouterError(error)) {
    return error.message
  } else if (typeof error === "string") {
    return error
  } else {
    console.error(error)
    return "Unknown error"
  }
}
