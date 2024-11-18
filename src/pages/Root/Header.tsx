import { NavLink } from "react-router-dom"
import { routes } from "@/lib/routes"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui"

const headerLinks = [
  { link: routes.home, label: "About" },
  { link: routes.notes.root, label: "Notes" },
] as const

export const Header = () => {
  const { logout } = useAuth()

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border",
        "px-8 py-4 flex flex-row-reverse items-center gap-10"
      )}
    >
      <Button variant="outline" onClick={() => logout()}>
        <a>Log out</a>
      </Button>
      <ul className="flex gap-4">
        {headerLinks.map(({ link, label }) => (
          <li key={link}>
            <NavLink
              to={link}
              className={({ isActive }) =>
                cn("text-gray-400", isActive && "text-white")
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  )
}
