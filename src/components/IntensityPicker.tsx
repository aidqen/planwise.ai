"use client"

import { KeyboardEvent, useCallback, useMemo, useRef } from "react"
import { Leaf, Gauge, Zap, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from 'framer-motion'

type IntensityValue = "relaxed" | "moderate" | "intense"

type IntensityPickerProps = {
  value: IntensityValue | null | undefined
  onChange: (value: IntensityValue) => void
  className?: string
}

const BASE_ICONS: Record<IntensityValue, typeof Leaf> = {
  relaxed: Leaf,
  moderate: Gauge,
  intense: Zap,
}

const CHECK_ICON = CheckCircle2

const ICON_COLOR: Record<IntensityValue, string> = {
  relaxed: "text-blue-300",
  moderate: "text-amber-400",
  intense: "text-rose-400",
}

const RING_BG: Record<IntensityValue, string> = {
  relaxed: "ring-blue-500 bg-blue-500/10",
  moderate: "ring-amber-500 bg-amber-500/10",
  intense: "ring-rose-500 bg-rose-500/10",
}

const LABELS: Record<IntensityValue, { title: string; description: string }> = {
  relaxed: { title: "Relaxed", description: "More breaks" },
  moderate: { title: "Moderate", description: "Balanced" },
  intense: { title: "Intense", description: "Minimal breaks" },
}

const OPTIONS: IntensityValue[] = ["relaxed", "moderate", "intense"]

export function IntensityPicker({ value, onChange, className }: IntensityPickerProps) {
  const refs = useRef<Record<IntensityValue, HTMLButtonElement | null>>({
    relaxed: null,
    moderate: null,
    intense: null,
  })

  const handleSelect = useCallback(
    (next: IntensityValue) => {
      if (next !== value) {
        onChange(next)
      }
    },
    [onChange, value]
  )

  const focusOption = useCallback((key: IntensityValue) => {
    refs.current[key]?.focus()
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const isPrev = event.key === "ArrowLeft" || event.key === "ArrowUp"
      const isNext = event.key === "ArrowRight" || event.key === "ArrowDown"

      if (!isPrev && !isNext) {
        if (event.key === " " || event.key === "Enter") {
          event.preventDefault()
          handleSelect(OPTIONS[index])
        }
        return
      }

      event.preventDefault()
      const nextIndex = isPrev
        ? (index - 1 + OPTIONS.length) % OPTIONS.length
        : (index + 1) % OPTIONS.length
      focusOption(OPTIONS[nextIndex])
    },
    [focusOption, handleSelect]
  )

  const activeValue = useMemo<IntensityValue | null>(() => {
    if (value && OPTIONS.includes(value)) {
      return value
    }
    return null
  }, [value])

  return (
    <div
      role="radiogroup"
      aria-label="Schedule intensity"
      className={cn("grid grid-cols-1 gap-3 md:gap-6 md:grid-cols-3", className)}
    >
      {OPTIONS.map((option, index) => {
        const isSelected = activeValue === option
        const Icon = isSelected ? CHECK_ICON : BASE_ICONS[option]
        const { title, description } = LABELS[option]

        return (
          <button
            key={option}
            ref={(node) => {
              refs.current[option] = node
            }}
            type="button"
            role="radio"
            aria-label={`${title}\n${description}`}
            aria-checked={isSelected}
            tabIndex={isSelected || (!activeValue && index === 0) ? 0 : -1}
            onClick={() => handleSelect(option)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cn(
              "group relative w-full rounded-2xl focus-visible:outline-none focus-visible:ring",
              "focus-visible:ring-offset-[#0B1220] focus-visible:ring-ring"
            )}
          >
            <div
              className={cn(
                "flex h-full flex-col items-center space-y-0 md:space-y-1.5 justify-center gap-2 rounded-2xl border border-white/15 p-2 md:p-5 text-center",
                "shadow-sm transition duration-150",
                "ring-1 ring-transparent ring-offset-0 ring-offset-[#0B1220]",
                !isSelected && "hover:border-white/25" ,
                isSelected && cn(RING_BG[option], "border-transparent"),
                
              )}
            >
                  <Icon
                    aria-hidden="true"
                    className={cn(
                      "h-5 w-5 md:h-7 md:w-7", ICON_COLOR[option]
                      // isSelected ?  : "text-muted-foreground "
                    )}
                  />

              <div className="space-y-0 md:space-y-1">
                <p className="text-sm md:text-[15px] font-semibold tracking-[-0.01em]">
                  {title}
                </p>
                <p className="text-xs md:text-sm text-white/70 tracking-[0.03em] font-[300]">{description}</p>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export type { IntensityPickerProps }
