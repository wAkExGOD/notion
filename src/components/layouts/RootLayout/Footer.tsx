import { cn } from "@/lib/utils"

export const Footer = () => {
  return (
    <footer
      className={cn(
        "w-full border-t bg-background/95 border-border",
        "px-8 py-4 mt-auto flex justify-between gap-4 text-gray-400"
      )}
    >
      <p>Created by: Vladislav Panasik</p>
      <p>BSU 2024</p>
    </footer>
  )
}
