'use client'
import { scheduleService } from '@/services/scheduleService'
import { scheduleBoilerplate } from '@/store/actions/schedule.actions'
import { motion } from 'framer-motion'
import { PlusCircle, CalendarDays, Sparkles } from 'lucide-react'
import { useMemo } from 'react'

// Motivational quotes about time and productivity
const QUOTES = [
  "The best time to plan is now.",
  "Small steps, big impact.",
  "Design your day, master your life.",
  "Turn minutes into achievements.",
  "Make every moment count."
]

export function WelcomeHero({ user, router }) {
  console.log("🚀 ~ WelcomeHero ~ user:", user)
  // Get a deterministic quote based on the user's ID or name
  const quote = useMemo(() => {
    const seed = user?.id || user?.name || ''
    const index = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % QUOTES.length
    return QUOTES[index]
  }, [user?.id, user?.name])

  async function activate() {
    // const schedule = scheduleBoilerplate(user.preferences, user.routines, user.goals, user)
    // console.log("🚀 ~ activate ~ schedule:", schedule)
    const result = await scheduleService.generateSchedule2({goals: user.goals, intensity: user.preferences.intensity, routines: user.routines})
    console.log("🚀 ~ activate ~ result:", result)
  }

  return (
    <div className="pt-4 md:pt-6">
      <div className="flex flex-col gap-6">
        {/* Top section with greeting and actions */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Greeting and subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-1.5"
          >
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Welcome back, <span className='capitalize'>{user?.name?.split(' ')[0]} 👋</span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ready to make the most of your day?
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-row gap-2 w-full sm:flex-row sm:gap-3 sm:w-auto"
          >
            {user?.schedules?.length > 0 && <button
              onClick={() => router.push('/schedule/all')}
              className="inline-flex gap-2 justify-center items-center px-4 py-2 text-sm font-medium text-gray-700 whitespace-nowrap rounded-lg border border-gray-200 backdrop-blur-sm transition-all duration-200 bg-white/80 hover:bg-white hover:border-gray-300 dark:bg-gray-800/80 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:border-gray-600"
            >
              <CalendarDays className="w-4 h-4" />
              <span>View Schedules</span>
            </button>}
            <button
              onClick={activate}
              // onClick={() => router.push('/schedule/new')}
              className="inline-flex gap-2 justify-center items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg transition-all duration-200 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 hover:shadow-md hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Schedule</span>
            </button>
          </motion.div>
        </div>
        {/* Motivational quote card */}
        {/* <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex gap-3 items-center px-4 py-3 w-max bg-gradient-to-r from-blue-50 rounded-3xl border to-blue-50/50 dark:from-blue-950/50 dark:to-blue-900/30 border-blue-100/50 dark:border-blue-800/50"
      >
        <div className="flex-shrink-0">
          <Sparkles className="w-5 h-5 text-blue-600/90 dark:text-blue-400/90" />
        </div>
        <p className="text-sm font-medium text-blue-900/90 dark:text-white">
          {quote}
        </p>
      </motion.div> */}

      </div>
    </div>
  )
}
