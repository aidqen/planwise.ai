"use client"

import { Info } from "lucide-react"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

type EmptyStateProps = {
  message: string
  className?: string
  children?: ReactNode
}

export function EmptyState({ message, className, children }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start p-7 text-left bg-gray-50 rounded-lg border-2 border-gray-200 border-dashed dark:bg-gray-800/30 dark:border-gray-700",
        className
      )}
    >
      {/* <Info className="mb-2 w-8 h-8 text-gray-400 dark:text-gray-500" /> */}
      <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
      {children}
    </div>
  )
}

export default EmptyState
