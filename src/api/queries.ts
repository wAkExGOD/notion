import { UserEntity, UserEntityToAuth } from "@/types"
import { request } from "./request"

export function logIn(user: UserEntityToAuth) {
  const params = new URLSearchParams(user)

  return request<UserEntity[]>(`/users?${params}`)
}

export function getUsers() {
  return request<UserEntity[]>("/users")
}

export function getUser(id: UserEntity["id"]) {
  return request<UserEntity>(`/users/${id}`)
}
