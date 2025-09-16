"use client"

import { ReactNode } from "react"

type Props = {
  title: string
  description: string
  children: ReactNode
}

export function FormWrapper({ title, description, children }: Props) {
  return (
    <div className="w-full">
      <div className="max-w-2xl">
        <div className="mb-4 space-y-2 text-start md:mb-8">
          <h1 className="text-xl font-medium text-gray-900 dark:text-gray-100 md:text-2xl">
            {title}
          </h1>
          <p className="max-w-lg text-sm text-gray-600 md:text-base dark:text-gray-400">
            {description}
          </p>
        </div>

        <div className="space-y-8">
          {children}
        </div>
      </div>
    </div>
  )
}

export default FormWrapper

