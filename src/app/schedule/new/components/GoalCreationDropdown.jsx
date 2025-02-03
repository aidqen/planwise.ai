'use client'
import { Plus } from 'lucide-react'
import { cn } from "@/lib/utils"
import { getImportanceColor } from '@/services/util.service'

const importanceLevels = [
  { value: 'low', label: 'Low', color: 'text-green-600 dark:text-green-400' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-600 dark:text-yellow-400' },
  { value: 'high', label: 'High', color: 'text-red-600 dark:text-red-400' }
]

export function GoalCreationDropdown({ 
  currentGoal, 
  currentImportance, 
  setCurrentImportance, 
  onCreateGoal 
}) {
  return (
    <div className="flex flex-col p-4 space-y-4">
      <button
        onClick={onCreateGoal}
        className="flex items-center gap-3 w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-md group transition-colors"
      >
        <div className="flex items-center flex-1">
          <Plus className="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
          <span className="text-sm text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">
            Create "{currentGoal}"
          </span>
        </div>
        <span
          className={cn(
            "px-2 py-1 text-xs font-medium rounded-md",
            getImportanceColor(currentImportance)
          )}
        >
          {currentImportance}
        </span>
      </button>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
          Set Importance Level
        </label>
        <div className="flex gap-2">
          {importanceLevels.map((level) => (
            <button
              key={level.value}
              onClick={(e) => {
                e.stopPropagation()
                setCurrentImportance(level.value)
              }}
              className={cn(
                "flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                level.color,
                currentImportance === level.value
                  ? "ring-2 ring-blue-500 dark:ring-blue-400 bg-gray-50 dark:bg-gray-800"
                  : "opacity-60 hover:opacity-100 hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
