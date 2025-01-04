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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function TaskDialog({ isCreateTask ,selectedTask, handleCloseModal, handleSaveTask }) {
  const [task, setTask] = useState({start: '', end: '', category: 'routine', summary: '', description: ''})
  console.log("🚀 ~ file: TaskDialog.jsx:20 ~ task:", task)

  useEffect(() => {
    if (selectedTask) {
      setTask(selectedTask);
    }
  }, [selectedTask]);


  function onHandleSaveTask() {
    handleSaveTask(task)
    onHandleCloseModal()
  }

  function onHandleCloseModal() {
    setTask({start: '', end: '', category: 'routine', summary: '', description: ''})
    handleCloseModal()
  }

  function handleChange({target}) {
    const { name, value } = target
    let formattedValue
    if (name === 'start' || name === 'end') {
      const time = value
      const [hours, minutes] = time?.split(':')
      const militaryHours = hours.padStart(2, '0')
      formattedValue = `${militaryHours}:${minutes}`
    } else formattedValue = value
    console.log("🚀 ~ file: TaskDialog.jsx:36 ~ timeString:", formattedValue)
    setTask({ ...task, [name]: formattedValue })
  }

  return (
    <Dialog open={!!selectedTask || isCreateTask} onOpenChange={onHandleCloseModal}>
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
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              id="category"
              value={task?.category}
              onValueChange={(value) => setTask({ ...task, category: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="break">Break</SelectItem>
                <SelectItem value="meal">Meal</SelectItem>
                <SelectItem value="goal">Goal</SelectItem>
                <SelectItem value="routine">Routine</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startTime" className="flex gap-2 items-center">
                <Clock className="w-4 h-4 text-blue-500" />
                Start Time
              </Label>
              <Input
                id="startTime"
                type="time"
                value={task?.start?.split(' ')[0]}
                name="start"
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endTime" className="flex gap-2 items-center">
                <Clock className="w-4 h-4 text-blue-500" />
                End Time
              </Label>
              <Input
                id="endTime"
                type="time"
                name="end"
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
          <Button onClick={onHandleSaveTask} className="text-white shadow-md bg-secondary">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
