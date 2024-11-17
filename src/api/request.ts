export type RequestParams = Parameters<typeof fetch>

const API_URL = "http://localhost:5001"

async function normalizeResponse<T>(response: Response) {
  let parsed: unknown

  try {
    parsed = await response.json()
  } catch {
    parsed = undefined
  }

  if (response.ok) {
    return parsed as T
  }

  throw new Error("Can't receive data")
}

export async function request<T>(...[input, options]: RequestParams) {
  const response = await fetch(API_URL + input.toString(), {
    ...options,
    headers: {
      ...options?.headers,
      "content-type": "application/json",
    },
  })

  return normalizeResponse<T>(response)
}
