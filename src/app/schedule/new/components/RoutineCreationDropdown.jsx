'use client'
import { Plus } from 'lucide-react'
import { cn } from "@/lib/utils"
import TimeInput from '@/components/TimeInput'
import { Label } from '@/components/ui/label'

export function RoutineCreationDropdown({ 
  currentRoutine,
  setCurrentRoutine,
  onCreateRoutine,
  multiStepForm
}) {
  const { preferences } = multiStepForm
  const wakeupHour = parseInt(preferences.wakeup?.split(':')[0])
  const sleepHour = parseInt(preferences.sleep?.split(':')[0])

  const handleTimeChange = (field) => (value) => {
    setCurrentRoutine({ ...currentRoutine, [field]: value });
  };

  return (
    <div 
      className="flex flex-col p-4 space-y-4"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onCreateRoutine}
        className="flex items-center gap-3 w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-md group transition-colors"
      >
        <div className="flex items-center flex-1">
          <Plus className="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
          <span className="text-sm text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">
            Create "{currentRoutine.name}"
          </span>
        </div>
      </button>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Start Time
          </Label>
          <TimeInput
            value={currentRoutine.startTime}
            onChange={handleTimeChange('startTime')}
            startHour={wakeupHour}
            endHour={sleepHour}
            placeholder="Select time"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-500 dark:text-gray-400">
            End Time
          </Label>
          <TimeInput
            value={currentRoutine.endTime}
            onChange={handleTimeChange('endTime')}
            startHour={currentRoutine.startTime ? parseInt(currentRoutine.startTime.split(':')[0]) : wakeupHour}
            endHour={sleepHour}
            placeholder="Select time"
          />
        </div>
      </div>
    </div>
  )
}
