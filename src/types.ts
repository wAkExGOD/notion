export type UserEntity = {
  id: string
  email: string
  password: string
  createdAt: number
}

export type UserEntityToAuth = Omit<UserEntity, "id" | "createdAt">

export type NoteEntity = {
  id: string
  userId: UserEntity["id"]
  name: string
  text: string
  createdAt: number
}

export type NoteEntityToCreate = Omit<NoteEntity, "id" | "createdAt">

export type NoteEntityToUpdate = Omit<NoteEntity, "createdAt">
