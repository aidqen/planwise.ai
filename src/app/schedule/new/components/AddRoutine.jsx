import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Plus } from "lucide-react";
import { Input } from "postcss";

export function AddRoutine({ newRoutine, setNewRoutine, addRoutine }) {
     
    return <Card className="mb-8 p-4 bg-transparent shadow-none border-transparent hover:shadow-xl transition-shadow duration-300">
    <CardContent className="p-0">
      <form onSubmit={addRoutine} className="space-y-3">
        <div className="flex flex-col gap-1">
          <Label
            htmlFor="routineName"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Routine Name
          </Label>
          <Input
            id="routineName"
            placeholder="e.g., Morning Workout, Team Meeting"
            value={newRoutine.name}
            onChange={e =>
              setNewRoutine({ ...newRoutine, name: e.target.value })
            }
            required
            className="h-10 px-3 py-2 border rounded-lg shadow-sm 
    focus-visible:ring-2 focus-visible:ring-blue-500 
    focus-visible:ring-offset-2 focus-visible:border-blue-500
    ring-2 ring-blue-200 truncate"
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <Label
              htmlFor="startTime"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Start Time
            </Label>
            <Input
              id="startTime"
              type="time"
              value={newRoutine.startTime}
              onChange={e =>
                setNewRoutine({ ...newRoutine, startTime: e.target.value })
              }
              required
              className="mt-1 text-neutral"
            />
          </div>
          <div className="flex-1">
            <Label
              htmlFor="endTime"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              End Time
            </Label>
            <Input
              id="endTime"
              type="time"
              value={newRoutine.endTime}
              onChange={e =>
                setNewRoutine({ ...newRoutine, endTime: e.target.value })
              }
              required
              className="mt-1 text-neutral"
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Routine
        </Button>
      </form>
    </CardContent>
  </Card>
}