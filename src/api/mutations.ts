import { request } from "./request"
import {
  NoteEntity,
  NoteEntityToCreate,
  NoteEntityToUpdate,
  UserEntity,
  UserEntityToAuth,
} from "@/types"

export function register(user: UserEntityToAuth) {
  return request<UserEntity>("/users", {
    method: "POST",
    body: JSON.stringify({
      email: user.email,
      password: user.password,
      createdAt: Date.now(),
    }),
  })
}

export function createNote(note: NoteEntityToCreate) {
  return request<NoteEntity>("/notes", {
    method: "POST",
    body: JSON.stringify({ ...note, createdAt: Date.now() }),
  })
}

export function editNote(note: NoteEntityToUpdate) {
  return request<NoteEntity>(`/notes/${note.id}`, {
    method: "PUT",
    body: JSON.stringify(note),
  })
}

export function deleteNote(id: NoteEntity["id"]) {
  return request<NoteEntity>(`/notes/${id}`, {
    method: "DELETE",
  })
}
