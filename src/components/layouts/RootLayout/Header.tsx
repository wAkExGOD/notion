import { Link, NavLink } from "react-router-dom"
import { routes } from "@/lib/routes"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui"

const headerLinks = [
  { link: routes.home, label: "About" },
  { link: routes.notes.root, label: "Notes" },
] as const

export const Header = () => {
  const { user, logout } = useAuth()

  const authButton = user ? (
    <Button
      variant="outline"
      className="cursor-pointer"
      onClick={() => logout()}
    >
      Log out
    </Button>
  ) : (
    <Link to={routes.logIn}>
      <Button variant="outline">Log in</Button>
    </Link>
  )

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "px-8 py-4 flex flex-row-reverse items-center gap-6"
      )}
    >
      {authButton}
      <div className="flex gap-4">
        {headerLinks.map(({ link, label }) => (
          <NavLink
            key={link}
            to={link}
            className={({ isActive }) =>
              cn("text-gray-400 leading-loose", isActive && "text-white")
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </header>
  )
}
