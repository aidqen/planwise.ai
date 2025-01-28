'use client'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { BackgroundDecoration } from './components/BackgroundDecoration'
import { WelcomeHero } from './components/WelcomeHero'
import { ScheduleStats } from './components/ScheduleStats'
import { GoalsStats } from './components/GoalsStats'

export default function Home() {
  const router = useRouter()
  // const user = useSelector(state => state.userModule.user)
  const user = {
    id: '2341',
    name: 'idan markin',
    email: 'idanmarkin8@gmail.com',
    schedules: [{id: '1234', name: 'Develop a SaaS', intensity: 'intense'}],
    goals: [{ id: '1234', name: 'Develop a SaaS', importance: 'high'}, {id: '1235', name: 'Learn React', importance: 'medium'}, {id: '1236', name: 'Build a website', importance: 'high'}],
    preferences: {},
    routines: [],
  }
  console.log("🚀 ~ file: page.jsx:40 ~ user:", user)

  const scheduleStats = {
    relaxed: user?.schedules?.filter(s => s.intensity === 'relaxed')?.length || 0,
    moderate: user?.schedules?.filter(s => s.intensity === 'moderate')?.length || 0,
    intense: user?.schedules?.filter(s => s.intensity === 'intense')?.length || 0
  }

  const goalStats = {
    high: user?.goals?.filter(g => g.importance === 'high')?.length || 0,
    medium: user?.goals?.filter(g => g.importance === 'medium')?.length || 0,
    low: user?.goals?.filter(g => g.importance === 'low')?.length || 0
  }

  return (
    <div className="flex overflow-y-auto flex-col items-center w-full min-h-screen bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/50">
      <div className="flex flex-col justify-center px-4 pt-[3em] md:pt-[5em] mx-auto w-full max-w-7xl sm:px-6 lg:px-8">
        <BackgroundDecoration />
        <WelcomeHero user={user} router={router} />
        
        <ConfigurationCTA user={user} />

        <div className="grid grid-cols-1 gap-6 mt-6 sm:gap-8 md:mt-16 md:grid-cols-2">
          <ScheduleStats user={user} scheduleStats={scheduleStats} />
          <GoalsStats user={user} goalStats={goalStats} />
        </div>
      </div>
    </div>
  )
}
