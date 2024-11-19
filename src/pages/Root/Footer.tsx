import { cn } from "@/lib/utils"

export const Footer = () => {
  return (
    <footer
      className={cn(
        "w-full border-t border-border/40 bg-background/95 dark:border-border",
        "px-8 py-4 mt-auto flex justify-between gap-4 text-gray-400"
      )}
    >
      <p>Created by: Vladislav Panasik</p>
      <p>BSU 2024</p>
    </footer>
  )
}
