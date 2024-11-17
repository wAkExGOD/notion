import { cn } from "@/lib/utils"
import { PropsWithChildren } from "react"

type CardProps = PropsWithChildren<{
  className?: string
}>

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 p-4 rounded-xl border overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  )
}
