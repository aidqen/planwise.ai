"use client"

import { ReactNode } from "react"

type Props = {
  title: string
  icon?: ReactNode
  children: ReactNode
}

export function ReviewSection({ title, icon, children }: Props) {
  return (
    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm md:p-5 dark:bg-gray-800/50 dark:border-gray-700/50">
      <h3 className="flex gap-2 items-center mb-5 text-base font-medium text-gray-900 dark:text-gray-100 md:text-lg">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  )
}

export default ReviewSection

