'use client'

export function BackgroundDecoration() {
  return (
    <div className="overflow-hidden absolute inset-0 pointer-events-none -z-10">
      <div className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[800px] lg:h-[800px] rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10 blur-3xl -top-[100px] -right-[100px] animate-pulse" />
      <div className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[800px] lg:h-[800px] rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/20 dark:from-blue-500/10 dark:to-blue-500/10 blur-3xl -bottom-[100px] -left-[100px] animate-pulse" />
    </div>
  )
}
