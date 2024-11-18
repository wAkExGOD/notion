import { NoteEntity, UserEntity, UserEntityToAuth } from "@/types"
import { request } from "./request"

export function logIn(user: UserEntityToAuth) {
  const params = new URLSearchParams(user)

  return request<UserEntity[]>(`/users?${params}`)
}

export function getNotes() {
  return request<NoteEntity[]>("/notes")
}

export function getUser(id: UserEntity["id"]) {
  return request<UserEntity>(`/users/${id}`)
}
