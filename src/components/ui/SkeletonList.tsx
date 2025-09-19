import React from 'react'
import { cn } from '@/lib/utils'

export type SkeletonListProps = {
  count?: number
  positions?: Array<'start' | 'end'>
  className?: string
}

export function SkeletonList({ count = 3, positions = [], className = '' }: SkeletonListProps) {
  const items = Array.from({ length: Math.max(0, count) })

  // Deterministic pseudo-random generator so widths/heights don't jitter per render
  const rand = (n: number) => {
    const x = Math.sin((n + 1) * 9301 + 49297) * 233280
    return (x - Math.floor(x))
  }

  const lineWidths = (i: number, lines: number) =>
    Array.from({ length: lines }).map((_, li) => {
      // Last line shorter (~45-65%), others 80-100%
      if (li === lines - 1) return 45 + Math.floor(rand(i + li + 7) * 20) // 45-65
      return 80 + Math.floor(rand(i + li + 3) * 20) // 80-100
    })

  return (
    <div className={cn('w-full mx-auto max-w-[560px] px-2 flex flex-col gap-4', className)}>
      {items.map((_, idx) => {
        const side: 'start' | 'end' = positions[idx] || (idx % 2 === 0 ? 'start' : 'end')
        const justify = side === 'end' ? 'justify-end' : 'justify-start'
        const isEnd = side === 'end'

        // 2–4 lines per bubble deterministically
        const lines = 2 + Math.floor(rand(idx) * 3)
        const widths = lineWidths(idx, lines)

        return (
          <div key={idx} className={cn('flex items-start gap-2', justify)}>
            {/* Left avatar for incoming */}
            {!isEnd && (
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-slate-700 relative overflow-hidden">
                <div className="skeleton-shimmer" />
              </div>
            )}

            {/* Bubble */}
            <div className={cn(
              'max-w-[80%] rounded-2xl px-4 py-3',
              isEnd ? 'bg-blue-50/60 dark:bg-blue-900/20' : 'bg-gray-100 dark:bg-slate-800'
            )}>
              {widths.map((w, li) => (
                <div key={li} className={cn(li ? 'mt-2' : '')}>
                  <div className="relative overflow-hidden rounded-md h-3 bg-gray-200 dark:bg-slate-700" style={{ width: `${w}%` }}>
                    <div className="skeleton-shimmer" />
                  </div>
                </div>
              ))}
            </div>

            {/* Right avatar for outgoing */}
            {isEnd && (
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-slate-700 relative overflow-hidden">
                <div className="skeleton-shimmer" />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default SkeletonList

