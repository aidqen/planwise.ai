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
import { makeId } from '@/services/util.service'

export function TaskDialog({ isCreateTask ,selectedTask, handleCloseModal, handleSaveTask, handleNewTaskSave, deleteTask }) {
  const [task, setTask] = useState({start: '', end: '', category: 'routine', summary: '', description: ''})

  useEffect(() => {
    if (selectedTask) {
      setTask(selectedTask);
    }
  }, [selectedTask]);

  function onDeleteTask() {
    deleteTask(task.id)
    onHandleCloseModal()
  }


  function onHandleSaveTask() {
    if (isCreateTask) {
      task.id = makeId(8)
      handleNewTaskSave(task)
    } else handleSaveTask(task)
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
    setTask({ ...task, [name]: formattedValue })
  }

  return (
    <Dialog open={!!selectedTask || isCreateTask} onOpenChange={onHandleCloseModal}>
      <DialogContent className="max-sm:w-[90%] rounded-[15px] bg-white dark:bg-gray-900 border dark:border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">{isCreateTask ? 'Create New Task' : 'Edit Task'}</DialogTitle>
          <DialogDescription className="text-start text-gray-500 dark:text-gray-400">
            Modify the task details and save your changes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="summary" className="text-gray-700 dark:text-gray-300">Summary</Label>
            <Input
              id="summary"
              value={task ? task?.summary : ''} 
              onChange={e => setTask({ ...task, summary: e.target.value })}
              className="col-span-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">Description</Label>
            <Textarea
              id="description"
              value={task ? task?.description : ''}
              onChange={e => setTask({ ...task, description: e.target.value })}
              className="col-span-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category" className="text-gray-700 dark:text-gray-300">Category</Label>
            <Select
              id="category"
              value={task?.category}
              onValueChange={(value) => setTask({ ...task, category: value })}
            >
              <SelectTrigger className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border dark:border-gray-700">
                <SelectItem value="break" className="text-gray-900 dark:text-gray-100">Break</SelectItem>
                <SelectItem value="meal" className="text-gray-900 dark:text-gray-100">Meal</SelectItem>
                <SelectItem value="goal" className="text-gray-900 dark:text-gray-100">Goal</SelectItem>
                <SelectItem value="routine" className="text-gray-900 dark:text-gray-100">Routine</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startTime" className="flex gap-2 items-center text-gray-700 dark:text-gray-300">
                <Clock className="w-4 h-4 text-blue-500" />
                Start Time
              </Label>
              <Input
                id="startTime"
                type="time"
                value={task?.start?.split(' ')[0]}
                name="start"
                onChange={handleChange}
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endTime" className="flex gap-2 items-center text-gray-700 dark:text-gray-300">
                <Clock className="w-4 h-4 text-blue-500" />
                End Time
              </Label>
              <Input
                id="endTime"
                type="time"
                name="end"
                value={task?.end?.split(' ')[0]}
                onChange={handleChange}
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>
        </div>
        <DialogFooter className="flex gap-2">
          <Button className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700" variant="outline" onClick={onHandleCloseModal}>
            Cancel
          </Button>
          {!isCreateTask && <Button className="text-white shadow-md bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700" variant="destructive" onClick={onDeleteTask}>
            Delete
          </Button>}
          <Button onClick={onHandleSaveTask} className="text-white shadow-md bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700">{isCreateTask ? 'Create New Task' :  'Save changes'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
