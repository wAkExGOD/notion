export const routes = {
  home: "/",
  registration: "/registration",
  logIn: "/log-in",
  users: {
    root: "users",
    user: {
      template: "/users/:id",
      create: (id: string | number) => `/users/${id}`,
    },
  },
} as const
