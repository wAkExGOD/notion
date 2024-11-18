import { NoteEntity } from "@/types"

export const routes = {
  home: "/",
  registration: "/registration",
  logIn: "/log-in",
  notes: {
    root: "/notes",
    create: "/notes/create",
    edit: {
      template: "/notes/edit/:id",
      create: (id: NoteEntity["id"]) => `/notes/edit/${id}`,
    },
  },
} as const
