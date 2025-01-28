import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { X } from 'lucide-react'
import TimePicker from '@/components/TimePicker'
import { useState } from 'react'

export function RoutineEdit({ routine, toggleEditing, saveEdit }) {
  const [startTime, setStartTime] = useState(routine.startTime)
  const [endTime, setEndTime] = useState(routine.endTime)
  return (
    <div className="p-4 mx-auto w-full max-w-xl bg-white rounded-xl border border-gray-800 shadow-lg transition-all duration-300 sm:p-6 dark:bg-gray-900 dark:border-gray-700">
      <form
        onSubmit={e => {
          e.preventDefault()
          saveEdit(routine.id, {
            name: e.currentTarget.routineName.value,
            startTime,
            endTime,
          })
        }}
        className="space-y-6"
      >
        <div className="space-y-5">
          <div>
            <Label
              htmlFor={`routineName-${routine.id}`}
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Routine Name
            </Label>
            <Input
              id={`routineName-${routine.id}`}
              name="routineName"
              defaultValue={routine.name}
              required
              className="px-3 py-2 w-full text-gray-900 bg-white rounded-lg border border-gray-300 transition-all duration-200 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Enter routine name"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label 
                htmlFor={`startTime-${routine.id}`}
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Start Time
              </Label>
              <TimePicker
                id={`startTime-${routine.id}`}
                name="startTime"
                value={startTime}
                onChange={(value) => {
                  // Optional: Add any additional logic if needed
                  setStartTime(value)
                }}
                placeholder="Select start time"
                className="w-full"
                />
            </div>

            <div>
              <Label 
                htmlFor={`endTime-${routine.id}`}
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                End Time
              </Label>
              <TimePicker
                id={`endTime-${routine.id}`}
                name="endTime"
                value={endTime}
                onChange={(value) => {
                  setEndTime(value)
                  // Optional: Add any additional logic if needed
                }}
                placeholder="Select end time"
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-end mt-6 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => toggleEditing(routine.id, false)}
            className="w-full text-gray-700 bg-white border-gray-300 transition-colors duration-200 sm:w-auto dark:text-gray-300 dark:border-gray-600 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <X className="mr-2 w-4 h-4" /> Cancel
          </Button>
          <Button 
            type="submit" 
            className="w-full text-white bg-blue-600 transition-all duration-200 sm:w-auto dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
