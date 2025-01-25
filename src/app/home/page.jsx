'use client'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { CalendarDays, Sparkles, Target, ArrowRight, Brain, Settings2, PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

function AnalyticCard({ title, value, description, icon: Icon, action, actionLabel }) {
  return (
    <div className="flex flex-col p-6 rounded-2xl shadow-sm backdrop-blur-sm transition-all duration-200 bg-white/80 hover:shadow-md dark:bg-gray-800/80 dark:shadow-gray-900/10 dark:hover:bg-gray-800/90">
      <div className="flex gap-4 items-center mb-4">
        <div className="flex justify-center items-center w-12 h-12 text-blue-600 bg-blue-100 rounded-xl transition-transform duration-200 group-hover:scale-110 dark:bg-blue-900/30 dark:text-blue-400">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
        </div>
        {action && (
          <button
            onClick={action}
            className="flex gap-2 items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg transition-all duration-200 hover:bg-blue-100 hover:scale-105 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50"
          >
            <PlusCircle className="w-4 h-4" />
            {actionLabel}
          </button>
        )}
      </div>
      {description && (
        <p className="pt-4 text-sm text-gray-500 border-t border-gray-100 dark:text-gray-400 dark:border-gray-700/50">
          {description}
        </p>
      )}
    </div>
  )
}

export default function Home() {
  const user = useSelector(state => state.userModule.user)
  console.log("🚀 ~ file: page.jsx:40 ~ user:", user)
  const router = useRouter()

  // Calculate schedule stats
  const scheduleStats = (user?.schedules || []).reduce((acc, schedule) => {
    const intensity = schedule?.preferences?.intensity || 'medium'
    acc[intensity] = (acc[intensity] || 0) + 1
    return acc
  }, {})

  return (
    <div className="flex overflow-y-auto flex-col items-center w-full min-h-screen bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/50">
      <div className="flex flex-col justify-center px-4 pt-[6.5em] mx-auto w-full max-w-7xl sm:pt-0 sm:px-6 lg:px-8">
        {/* Background decoration */}
        <div className="overflow-hidden absolute inset-0 pointer-events-none -z-10">
          <div className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[800px] lg:h-[800px] rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10 blur-3xl -top-[100px] -right-[100px] animate-pulse" />
          <div className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[800px] lg:h-[800px] rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/20 dark:from-green-500/10 dark:to-blue-500/10 blur-3xl -bottom-[100px] -left-[100px] animate-pulse" />
        </div>

        <div className="py-6 text-center sm:py-12 lg:py-16">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex gap-2 items-center px-3 sm:px-4 py-1.5 sm:py-2 mb-6 sm:mb-8 mt-8 sm:mt-0 text-xs sm:text-sm font-medium text-blue-600 bg-blue-50/80 backdrop-blur-sm rounded-full dark:bg-blue-900/30 dark:text-blue-400"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            Welcome back, {user?.name?.split(' ')[0]} 👋
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="px-4 mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white"
          >
            <span className="block">Own your day with</span>
            <span className="block relative text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 dark:from-blue-400 dark:to-green-400">
              AI-powered scheduling
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="px-4 mx-auto mb-8 max-w-lg text-sm text-gray-500 sm:mb-12 sm:max-w-2xl sm:text-base lg:text-lg dark:text-gray-400"
          >
            Transform your daily routine with intelligent scheduling that adapts to your goals and preferences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-3 items-center px-4 mx-auto max-w-xs sm:gap-4 sm:flex-row sm:justify-center sm:max-w-xl"
          >
            <button
              onClick={() => router.push('/schedule/new')}
              className="w-full sm:w-auto inline-flex relative gap-2 justify-center items-center px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white bg-gradient-to-r from-blue-600 to-green-500 rounded-xl transition-all duration-200 group hover:scale-105 hover:shadow-lg dark:shadow-blue-500/25"
            >
              <span>Create Your Schedule</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 sm:w-5 sm:h-5 group-hover:translate-x-1" />
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-green-500 rounded-xl opacity-30 blur-lg transition-opacity duration-200 group-hover:opacity-50" />
            </button>
            <button
              onClick={() => router.push('/schedule/all')}
              className="w-full sm:w-auto inline-flex gap-2 justify-center items-center px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-gray-700 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 transition-all duration-200 group hover:bg-white hover:border-gray-300 hover:scale-105 dark:bg-gray-800/80 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <span>View Schedules</span>
              <CalendarDays className="w-4 h-4 transition-transform duration-200 sm:w-5 sm:h-5 group-hover:scale-110" />
            </button>
          </motion.div>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 gap-6 px-4 mt-12 sm:gap-8 sm:mt-16 md:grid-cols-2">
            <AnalyticCard
              title="Active Goals"
              value={user?.goals?.length || 0}
              description={user?.goals?.length ? 
                `You have ${user.goals.length} active goals to work towards` : 
                "Set your first goal to get started with personalized scheduling"
              }
              icon={Target}
              action={user?.goals?.length ? null : () => router.push('/goals')}
              actionLabel="Add Goals"
            />
            
            <div className="flex flex-col p-6 rounded-2xl shadow-sm backdrop-blur-sm transition-all duration-200 bg-white/80 hover:shadow-md dark:bg-gray-800/80 dark:shadow-gray-900/10 dark:hover:bg-gray-800/90">
              <div className="flex gap-4 items-center">
                <div className="flex justify-center items-center w-12 h-12 text-blue-600 bg-blue-100 rounded-xl transition-transform duration-200 dark:bg-blue-900/30 dark:text-blue-400">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Schedules</h3>
                {(!user?.schedules?.length) && (
                  <button
                    onClick={() => router.push('/schedule/new')}
                    className="flex gap-2 items-center ml-auto px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg transition-all duration-200 hover:bg-blue-100 hover:scale-105 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Create Schedule
                  </button>
                )}
              </div>
              
              {user?.schedules?.length > 0 ? (
                <div className="mt-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Schedules</p>
                      <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{user?.schedules?.length}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex gap-3 items-center">
                        <div className="flex flex-1 gap-2 items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">Relaxed</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{scheduleStats.relaxed || 0}</span>
                          <div className="w-24 h-2 bg-gray-100 rounded-full dark:bg-gray-700">
                            <div 
                              className="h-full bg-blue-400 rounded-full" 
                              style={{ 
                                width: `${((scheduleStats.relaxed || 0) / (user?.schedules?.length || 1)) * 100}%`,
                                transition: 'width 0.3s ease-in-out'
                              }} 
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 items-center">
                        <div className="flex flex-1 gap-2 items-center">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">Moderate</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{scheduleStats.moderate || 0}</span>
                          <div className="w-24 h-2 bg-gray-100 rounded-full dark:bg-gray-700">
                            <div 
                              className="h-full bg-yellow-400 rounded-full" 
                              style={{ 
                                width: `${((scheduleStats.moderate || 0) / (user?.schedules?.length || 1)) * 100}%`,
                                transition: 'width 0.3s ease-in-out'
                              }} 
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 items-center">
                        <div className="flex flex-1 gap-2 items-center">
                          <div className="w-2 h-2 bg-red-400 rounded-full" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">Intense</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{scheduleStats.intense || 0}</span>
                          <div className="w-24 h-2 bg-gray-100 rounded-full dark:bg-gray-700">
                            <div 
                              className="h-full bg-red-400 rounded-full" 
                              style={{ 
                                width: `${((scheduleStats.intense || 0) / (user?.schedules?.length || 1)) * 100}%`,
                                transition: 'width 0.3s ease-in-out'
                              }} 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Create your first AI-powered schedule to optimize your day
                </p>
              )}
            </div>

            {/* <AnalyticCard
              title="Schedule Preferences"
              value={user?.preferences ? "Configured" : "Not Set"}
              description={user?.preferences ? 
                `Wake up: ${user.preferences.wakeup} · Sleep: ${user.preferences.sleep} · ${user.preferences.intensity} intensity` :
                "Configure your preferences for better personalized schedules"
              }
              icon={Settings2}
              action={user?.preferences ? null : () => router.push('/preferences')}
              actionLabel="Set Preferences"
            /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
