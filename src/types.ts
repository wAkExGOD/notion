export type UserEntity = {
  id: string
  email: string
  password: string
  createdAt: number
}

export type UserEntityToAuth = Omit<UserEntity, "id" | "createdAt">
