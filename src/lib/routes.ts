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
      _create: (id: NoteEntity["id"]) => `/notes/edit/${id}`,
    },
    template: "/notes/:id",
    _create: (id: NoteEntity["id"]) => `/notes/${id}`,
  },
} as const
