import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Clock } from 'lucide-react'

export function RoutineEdit({ routine, toggleEditing, saveEdit }) {
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 sm:p-6">
      <form
        onSubmit={e => {
          e.preventDefault()
          saveEdit(routine.id, {
            name: e.currentTarget.routineName.value,
            startTime: e.currentTarget.startTime.value,
            endTime: e.currentTarget.endTime.value,
          })
        }}
        className="space-y-6"
      >
        <div className="space-y-4">
          <div>
            <Label
              htmlFor={`routineName-${routine.id}`}
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Routine Name
            </Label>
            <div className="relative">
              <Input
                id={`routineName-${routine.id}`}
                name="routineName"
                defaultValue={routine.name}
                required
                className="py-2 pr-10 pl-3 w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter routine name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label
                htmlFor={`startTime-${routine.id}`}
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Start Time
              </Label>
              <div className="relative">
                <Input
                  id={`startTime-${routine.id}`}
                  name="startTime"
                  type="time"
                  defaultValue={routine.startTime}
                  required
                  className="py-2 pr-3 pl-9 w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                />
                <Clock className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 transform -translate-y-1/2" />
              </div>
            </div>

            <div>
              <Label
                htmlFor={`endTime-${routine.id}`}
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                End Time
              </Label>
              <div className="relative">
                <Input
                  id={`endTime-${routine.id}`}
                  name="endTime"
                  type="time"
                  defaultValue={routine.endTime}
                  required
                  className="py-2 pr-3 pl-9 w-full rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                />
                <Clock className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 transform -translate-y-1/2" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 justify-end mt-6 sm:flex-row sm:gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => toggleEditing(routine.id, false)}
            className="order-1 w-full sm:w-auto sm:order-none"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="w-full text-white bg-blue-600 sm:w-auto hover:bg-blue-700"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
