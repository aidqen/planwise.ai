"use client"

import { ReactNode } from "react"

type Props = {
  label: string
  value: ReactNode
}

export function ReviewListItem({ label, value }: Props) {
  return (
    <div className="flex justify-between items-center p-2 md:p-3 rounded-lg transition-colors duration-200 bg-gray-50/80 dark:bg-gray-800/80 hover:bg-gray-100/80 dark:hover:bg-gray-700/50">
      <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{value}</span>
    </div>
  )
}

export default ReviewListItem

