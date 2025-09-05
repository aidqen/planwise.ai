'use client'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { Target, Clock } from 'lucide-react'
import { ConfigurationCTA } from './components/ConfigurationCTA'
import { BackgroundDecoration } from './components/BackgroundDecoration'
import { WelcomeHero } from './components/WelcomeHero'
import { StatisticsCard } from './components/StatisticsCard'
import { useMemo } from 'react'

const SCHEDULE_TYPES = [
  { id: 'relaxed', label: 'Relaxed', color: 'bg-blue-400' },
  { id: 'moderate', label: 'Moderate', color: 'bg-yellow-400' },
  { id: 'intense', label: 'Intense', color: 'bg-red-400' }
]

const GOAL_TYPES = [
  { id: 'low', label: 'Low Priority', color: 'bg-blue-400' },
  { id: 'medium', label: 'Medium Priority', color: 'bg-yellow-400' },
  { id: 'high', label: 'High Priority', color: 'bg-red-400' }
]

export default function Home() {
  const router = useRouter()
  const user = useSelector(state => state.userModule.user)
  // const user = {
  //   id: '2341',
  //   name: 'idan markin',
  //   email: 'idanmarkin8@gmail.com',
  //   schedules: [
  //     {id: '1234', name: 'Develop a SaaS', intensity: 'intense'}
  //   ],
  //   goals: [
  //     { id: '1234', name: 'Develop a SaaS', importance: 'high'}, 
  //     {id: '1235', name: 'Learn React', importance: 'medium'}, 
  //     {id: '1236', name: 'Build a website', importance: 'high'}
  //   ],
  //   preferences: {},
  //   routines: [],
  // }
  console.log("🚀 ~ file: page.jsx:40 ~ user:", user)

  const scheduleStats = useMemo(() => ({
    relaxed: user?.schedules?.filter(s => s?.preferences?.intensity === 'relaxed')?.length || 0,
    moderate: user?.schedules?.filter(s => s?.preferences?.intensity === 'moderate')?.length || 0,
    intense: user?.schedules?.filter(s => s?.preferences?.intensity === 'intense')?.length || 0
  }), [user?.schedules])

  const goalStats = useMemo(() => ({
    low: user?.goals?.filter(g => g.importance === 'low')?.length || 0,
    medium: user?.goals?.filter(g => g.importance === 'medium')?.length || 0,
    high: user?.goals?.filter(g => g.importance === 'high')?.length || 0
  }), [user?.goals])

  return (
    <div className="flex overflow-y-auto flex-col items-center w-full min-h-screen bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/50">
      <div className="flex flex-col justify-center space-y-9 px-4 pb-10 pt-[3em] md:pt-[5em] mx-auto w-full max-w-7xl sm:px-6 lg:px-8">
        <BackgroundDecoration />
        <WelcomeHero user={user} router={router} />
        
        <ConfigurationCTA user={user} />

        <div className="grid grid-cols-1 gap-6 mt-6 sm:gap-8 md:mt-16 md:grid-cols-2">
          <StatisticsCard 
            user={user}
            stats={scheduleStats}
            types={SCHEDULE_TYPES}
            title="Schedule"
            emptyMessage="Create your first AI-powered schedule to optimize your day"
            emptyButtonText="Create Schedule"
            route="/schedule/new"
          />
          <StatisticsCard 
            user={user}
            stats={goalStats}
            types={GOAL_TYPES}
            title="Goal"
            emptyMessage="Set your first goal to get started with personalized scheduling"
            emptyButtonText="Add Goals"
            route="/preferences"
          />
        </div>
      </div>
    </div>
  )
}
