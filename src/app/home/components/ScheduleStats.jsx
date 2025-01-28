'use client'
import { useRouter } from 'next/navigation'
import { PlusCircle } from 'lucide-react'
import { IntensityBar } from './IntensityBar'

const INTENSITY_TYPES = [
  { id: 'relaxed', label: 'Relaxed', color: 'bg-blue-400' },
  { id: 'moderate', label: 'Moderate', color: 'bg-yellow-400' },
  { id: 'intense', label: 'Intense', color: 'bg-red-400' }
]

export function ScheduleStats({ user, scheduleStats }) {
  const router = useRouter()
  return (
    <div className="flex flex-col p-6 md:h-[180px] rounded-2xl shadow-sm backdrop-blur-sm transition-all duration-200 bg-white/80 hover:shadow-md dark:bg-gray-800/80 dark:shadow-gray-900/10 dark:hover:bg-gray-800/90">
      {user?.schedules?.length ? (
          <div className="flex flex-col md:grid md:grid-cols-[30%_70%] xl:grid-cols-[40%_60%] gap-6 h-full items-center">
            <div className='flex flex-col items-center'>
              <p className="text-sm text-gray-500 dark:text-gray-400">Schedules</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{user?.schedules?.length}</p>
            </div>
            <div className="col-start-2 space-y-2 w-max">
              {INTENSITY_TYPES.map(type => (
                <IntensityBar
                  key={type.id}
                  label={type.label}
                  value={scheduleStats[type.id]}
                  total={user?.schedules?.length}
                  color={type.color}
                />
              ))}
            </div>
          </div>
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center h-full">
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 max-w-[240px]">
            Create your first AI-powered schedule to optimize your day
          </p>
          <button
            onClick={() => router.push('/schedule/new')}
            className="flex gap-2 items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg transition-all duration-200 hover:bg-blue-100 hover:scale-105 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50"
          >
            <PlusCircle className="w-4 h-4" />
            Create Schedule
          </button>
        </div>
      )}
    </div>
  )
}
