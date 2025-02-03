import { Button } from '@/components/ui/button'
import { Clock, Edit2, Trash2 } from 'lucide-react'

export function RoutinePreview({ routine, deleteRoutine, toggleEditing }) {
  return (
    <div className="relative p-4 bg-white rounded-xl border border-gray-100 shadow-sm transition-all duration-300 group hover:shadow-md dark:bg-gray-800/20 dark:hover:bg-gray-800/40 dark:border-gray-700/50 dark:hover:border-gray-600/50">
      <div className="flex gap-4 justify-between items-start">
        {/* Left side - Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate dark:text-gray-100">
            {routine.name}
          </h3>
          <div className="flex gap-2 items-center mt-1 text-sm">
            <div className="flex items-center gap-1.5 text-gray-800  rounded-full  dark:text-gray-300/80">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-medium whitespace-nowrap">
                {routine.startTime} - {routine.endTime}
              </span>
            </div>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleEditing(routine.id, true)}
            className="w-8 h-8 text-gray-500 transition-colors hover:text-blue-500 hover:bg-blue-50 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-500/10"
          >
            <Edit2 className="w-4 h-4" />
            <span className="sr-only">Edit routine</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteRoutine(routine.id)}
            className="w-8 h-8 text-gray-500 transition-colors hover:text-red-500 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-500/10"
          >
            <Trash2 className="w-4 h-4" />
            <span className="sr-only">Delete routine</span>
          </Button>
        </div>
      </div>
    </div>
  )
}