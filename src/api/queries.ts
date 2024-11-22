import { NoteEntity, UserEntity, UserEntityToAuth } from "@/types"
import { request } from "./request"

export function logIn(user: UserEntityToAuth) {
  const params = new URLSearchParams(user)

  return request<UserEntity[]>(`/users?${params}`)
}

export function getNote(id: NoteEntity["id"]) {
  return request<NoteEntity>(`/notes/${id}`)
}

export function getNotes(userId?: UserEntity["id"]) {
  if (!userId) {
    return []
  }

  const params = new URLSearchParams({
    userId,
  })

  return request<NoteEntity[]>(`/notes?${params}`)
}

export function getUser(id: UserEntity["id"]) {
  return request<UserEntity>(`/users/${id}`)
}

export function getUsersByEmail(email: UserEntity["email"]) {
  return request<UserEntity[]>(`/users?email=${email}`)
}
