import { cn } from "@/lib/utils"
import { PropsWithChildren } from "react"

type HeadingProps = PropsWithChildren<{
  className?: string
}>

export const Heading: React.FC<HeadingProps> = ({ className, children }) => {
  return (
    <h1 className={cn("font-bold text-2xl text-center", className)}>
      {children}
    </h1>
  )
}
