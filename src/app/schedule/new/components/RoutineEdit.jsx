import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'

export function RoutineEdit({ routine, toggleEditing, saveEdit }) {
  return (
    <CardContent className="p-4">
      <form
        onSubmit={e => {
          e.preventDefault()
          saveEdit(routine.id, {
            name: e.currentTarget.routineName.value,
            startTime: e.currentTarget.startTime.value,
            endTime: e.currentTarget.endTime.value,
          })
        }}
        className="space-y-2"
      >
        <div>
          <Label
            htmlFor={`routineName-${routine.id}`}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Routine Name
          </Label>
          <Input
            id={`routineName-${routine.id}`}
            name="routineName"
            defaultValue={routine.name}
            required
            className="mt-1"
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <Label
              htmlFor={`startTime-${routine.id}`}
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Start Time
            </Label>
            <Input
              id={`startTime-${routine.id}`}
              name="startTime"
              type="time"
              defaultValue={routine.startTime}
              required
              className="mt-1"
            />
          </div>
          <div className="flex-1">
            <Label
              htmlFor={`endTime-${routine.id}`}
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              End Time
            </Label>
            <Input
              id={`endTime-${routine.id}`}
              name="endTime"
              type="time"
              defaultValue={routine.endTime}
              required
              className="mt-1"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => toggleEditing(routine.id, false)}
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-secondary hover:bg-green-600 text-white">
            Save
          </Button>
        </div>
      </form>
    </CardContent>
  )
}
