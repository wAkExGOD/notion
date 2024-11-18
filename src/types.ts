import { SORTINGS } from "./constants/sortings"

export type UserEntity = {
  id: string
  email: string
  password: string
  createdAt: number
}

export type UserEntityToAuth = Omit<UserEntity, "id" | "createdAt">

export type NoteEntity = {
  id: string
  title: string
  createdAt: number
}

export type NoteEntityToCreate = Omit<NoteEntity, "id" | "createdAt">

export type NoteEntityToUpdate = Omit<NoteEntity, "createdAt">

export type Sorting = keyof typeof SORTINGS
export type NoteFilters = {
  searchValue: string
  sorting: Sorting
}
