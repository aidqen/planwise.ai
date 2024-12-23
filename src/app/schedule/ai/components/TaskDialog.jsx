import { Clock } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'

export function TaskDialog({ selectedTask, handleCloseModal}) {
  console.log('selectedTask:', selectedTask)
  const [task, setTask] = useState(selectedTask)
  console.log('task:', task)

  useEffect(() => {
    setTask(selectedTask);
  }, [selectedTask]);

  const handleSave = () => {
    // onSave?.(task)
  }

  function handleChange(e) {
    const time = e.target.value
    const [hours, minutes] = time?.split(':')
    const period = Number(hours) >= 12 ? 'PM' : 'AM'
    const formattedHours = Number(hours) > 12 ? Number(hours) - 12 : Number(hours)
    const timeString = `${formattedHours}:${minutes} ${period}`
    setTask({ ...task, startTime: timeString })
  }

  return (
    <Dialog open={!!selectedTask} onOpenChange={handleCloseModal}>
      <DialogContent className="max-sm:w-[90%] rounded-[15px]" onOpenAutoFocus={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Task</DialogTitle>
          <DialogDescription className="text-start">
            Modify the task details and save your changes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="summary">Summary</Label>
            <Input
              id="summary"
              value={task ? task?.summary : ''} 
              onChange={e => setTask({ ...task, summary: e.target.value })}
              className="col-span-3"
            
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={task ? task?.description : ''}
              onChange={e => setTask({ ...task, description: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startTime" className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                Start Time
              </Label>
              <Input
                id="startTime"
                type="time"
                value={task?.start?.split(' ')[0]}
                onChange={e => {}}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endTime" className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                End Time
              </Label>
              <Input
                id="endTime"
                type="time"
                value={task?.end?.split(' ')[0]}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <DialogFooter className="flex gap-2">
          <Button className="shadow-md" variant="outline" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-secondary text-white shadow-md">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
