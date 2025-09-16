"use client"

import { useState } from "react"
import TimePicker from "@/components/TimePicker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Save } from "lucide-react"
import { cn } from "@/lib/utils"

type TaskEditProps = {
  id: string
  defaultTitle?: string
  defaultName?: string
  defaultStartTime?: string
  defaultEndTime?: string
  nameLabel?: string
  startLabel?: string
  endLabel?: string
  onCancel: (id: string) => void
  onSave: (id: string, data: { name: string; startTime?: string; endTime?: string }) => void
}

export function TaskEdit({
  id,
  defaultTitle,
  defaultName,
  defaultStartTime,
  defaultEndTime,
  nameLabel = "Task Name",
  startLabel = "Start Time",
  endLabel = "End Time",
  onCancel,
  onSave,
}: TaskEditProps) {
  const initialName = defaultTitle ?? defaultName ?? ""
  const [name, setName] = useState(initialName)
  const [startTime, setStartTime] = useState<string | undefined>(defaultStartTime)
  const [endTime, setEndTime] = useState<string | undefined>(defaultEndTime)
  const [timeError, setTimeError] = useState("")

  const validateTimes = (start?: string, end?: string) => {
    if (!start || !end) return true
    const [sh, sm] = start.split(":").map(Number)
    const [eh, em] = end.split(":").map(Number)
    return eh * 60 + em > sh * 60 + sm
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validateTimes(startTime, endTime)) {
      setTimeError("End time must be after start time")
      return
    }
    onSave(id, { name, startTime, endTime })
  }

  return (
    <div className="overflow-hidden p-4 bg-white rounded-xl border border-gray-100 shadow-md transition-all duration-300 dark:bg-gray-800/20 dark:border-gray-700/50">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`taskName-${id}`} className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {nameLabel}
            </Label>
            <Input
              id={`taskName-${id}`}
              name="taskName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={cn(
                "w-full bg-white dark:bg-gray-800/50",
                "border-gray-200 dark:border-gray-700 dark:text-gray-100",
                "focus:border-blue-500 dark:focus:border-blue-400",
                "placeholder:text-gray-400 dark:placeholder:text-gray-500"
              )}
              placeholder="Enter task name"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`startTime-${id}`} className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {startLabel}
              </Label>
              <TimePicker
                id={`startTime-${id}`}
                name="startTime"
                value={startTime}
                onChange={(value?: string) => {
                  setStartTime(value)
                  setTimeError("")
                }}
                placeholder="Select start time"
                className={cn("w-full", timeError && "border-red-500 dark:border-red-500")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`endTime-${id}`} className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {endLabel}
              </Label>
              <TimePicker
                id={`endTime-${id}`}
                name="endTime"
                value={endTime}
                onChange={(value?: string) => {
                  setEndTime(value)
                  setTimeError("")
                }}
                placeholder="Select end time"
                className={cn("w-full", timeError && "border-red-500 dark:border-red-500")}
              />
            </div>
          </div>

          {timeError && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{timeError}</p>
          )}
        </div>

        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end sm:gap-3">
          <button
            type="button"
            onClick={() => onCancel(id)}
            className="justify-center w-full inline-flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 px-4 py-2 text-black dark:text-white sm:w-auto hover:bg-gray-50 dark:hover:bg-gray-700/50"
          >
            <X className="mr-1 w-4 h-4" />
            Cancel
          </button>
          <button
            type="submit"
            className="justify-center w-full inline-flex items-center gap-2 rounded-md bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <Save className="mr-1 w-4 h-4" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskEdit

