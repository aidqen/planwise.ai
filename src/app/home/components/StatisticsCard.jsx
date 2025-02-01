'use client'
import { useRouter } from 'next/navigation'
import { PlusCircle, ArrowRight } from 'lucide-react'
import { StatisticsBar } from './StatisticsBar'

export function StatisticsCard({ 
  user, 
  stats, 
  types, 
  title, 
  emptyMessage, 
  emptyButtonText,
  route 
}) {
  const router = useRouter()
  
  return (
    <div className="flex flex-col">
      <div 
        onClick={() => router.push(route)} 
        className="cursor-pointer flex flex-col p-6 md:h-[180px] rounded-2xl shadow-sm backdrop-blur-sm transition-all duration-200 bg-white/80 hover:shadow-md dark:bg-gray-800/80 dark:shadow-gray-900/10 dark:hover:bg-gray-800/90"
      >
        {user?.[title.toLowerCase() + 's']?.length ? (
          <div className="flex flex-col md:grid md:grid-cols-[30%_70%] xl:grid-cols-[40%_60%] gap-6 h-full items-center">
            <div className='flex flex-col items-center'>
              <p className="text-sm text-gray-500 dark:text-gray-400">{title}s</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                {user?.[title.toLowerCase() + 's']?.length}
              </p>
            </div>
            <div className="col-start-2 space-y-2 w-max">
              {types.map(type => (
                <StatisticsBar
                  key={type.id}
                  label={type.label}
                  value={stats[type.id] ?? 0}
                  total={user?.[title.toLowerCase() + 's']?.length}
                  color={type.color}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center h-full">
            <p className="text-sm text-center text-gray-500 dark:text-gray-400 max-w-[240px]">
              {emptyMessage}
            </p>
            <button
              onClick={() => router.push(route)}
              className="flex gap-2 items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg transition-all duration-200 hover:bg-blue-100 hover:scale-105 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50"
            >
              <PlusCircle className="w-4 h-4" />
              {emptyButtonText}
            </button>
          </div>
        )}
      </div>
      {user?.[title.toLowerCase() + 's']?.length > 0 && (
        <div className="flex justify-center mt-3">
          <button
            onClick={() => router.push(title === 'Schedule' ? '/schedule/all' : '/preferences')}
            className="flex gap-1 items-center text-xs text-gray-500 transition-colors duration-200 hover:underline dark:text-gray-400 dark:hover:text-gray-300"
          >
            {title === 'Schedule' ? 'View All Schedules' : 'Edit Preferences'}
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  )
}
