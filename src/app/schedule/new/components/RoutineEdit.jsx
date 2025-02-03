'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X, Save } from 'lucide-react'
import TimePicker from '@/components/TimePicker'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function RoutineEdit({ routine, toggleEditing, saveEdit }) {
  const [startTime, setStartTime] = useState(routine.startTime)
  const [endTime, setEndTime] = useState(routine.endTime)
  const [timeError, setTimeError] = useState('')

  const validateTimes = (start, end) => {
    if (!start || !end) return true
    const [startHour, startMin] = start.split(':').map(Number)
    const [endHour, endMin] = end.split(':').map(Number)
    const startValue = startHour * 60 + startMin
    const endValue = endHour * 60 + endMin
    return endValue > startValue
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateTimes(startTime, endTime)) {
      setTimeError('End time must be after start time')
      return
    }
    saveEdit(routine.id, {
      name: e.currentTarget.routineName.value,
      startTime,
      endTime,
    })
  }

  return (
    <div className="overflow-hidden p-4 bg-white rounded-xl border border-gray-100 shadow-md transition-all duration-300 dark:bg-gray-800/20 dark:border-gray-700/50">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          {/* Routine Name Input */}
          <div className="space-y-2">
            <Label
              htmlFor={`routineName-${routine.id}`}
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Routine Name
            </Label>
            <Input
              id={`routineName-${routine.id}`}
              name="routineName"
              defaultValue={routine.name}
              required
              className={cn(
                "w-full bg-white dark:bg-gray-800/50",
                "border-gray-200 dark:border-gray-700 dark:text-gray-100",
                "focus:border-blue-500 dark:focus:border-blue-400",
                "placeholder:text-gray-400 dark:placeholder:text-gray-500"
              )}
              placeholder="Enter routine name"
            />
          </div>

          {/* Time Inputs */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label 
                htmlFor={`startTime-${routine.id}`}
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Start Time
              </Label>
              <TimePicker
                id={`startTime-${routine.id}`}
                name="startTime"
                value={startTime}
                onChange={(value) => {
                  setStartTime(value)
                  setTimeError('')
                }}
                placeholder="Select start time"
                className={cn(
                  "w-full",
                  timeError && "border-red-500 dark:border-red-500"
                )}
              />
            </div>

            <div className="space-y-2">
              <Label 
                htmlFor={`endTime-${routine.id}`}
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                End Time
              </Label>
              <TimePicker
                id={`endTime-${routine.id}`}
                name="endTime"
                value={endTime}
                onChange={(value) => {
                  setEndTime(value)
                  setTimeError('')
                }}
                placeholder="Select end time"
                className={cn(
                  "w-full",
                  timeError && "border-red-500 dark:border-red-500"
                )}
              />
            </div>
          </div>

          {timeError && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
              {timeError}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end sm:gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => toggleEditing(routine.id, false)}
            className="justify-center w-full sm:w-auto dark:text-white dark:bg-gray-800/50 dark:hover:bg-gray-700/50"
          >
            <X className="mr-2 w-4 h-4" />
            Cancel
          </Button>
          <Button 
            type="submit"
            className="justify-center w-full bg-blue-600 dark:text-white hover:bg-blue-700 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <Save className="mr-2 w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
