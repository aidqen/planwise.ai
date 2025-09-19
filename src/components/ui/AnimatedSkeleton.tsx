import React from 'react'
import { cn } from '@/lib/utils'

export type AnimatedSkeletonProps = React.HTMLAttributes<HTMLDivElement>

export function AnimatedSkeleton({ className = '', ...props }: AnimatedSkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-neutral-200/80 dark:bg-gray-700/80',
        className
      )}
      {...props}
    />
  )
}

export default AnimatedSkeleton

