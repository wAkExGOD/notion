import { request } from "./request"
import { UserEntity, UserEntityToAuth } from "@/types"

export function register(user: UserEntityToAuth) {
  return request<UserEntity>("/users", {
    method: "POST",
    body: JSON.stringify({ ...user, createdAt: Date.now() }),
  })
}
