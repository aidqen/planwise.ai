"use client"

import { ReactNode } from "react"
import { Calendar as CalendarIcon, Clock, Edit2, Trash2 } from "lucide-react"

export type TaskLike = {
  id: string
  title?: string
  name?: string
  start?: string | Date
  end?: string | Date
  startTime?: string
  endTime?: string
  iconLeft?: ReactNode
}

type Props = {
  task: TaskLike
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  actionsRight?: ReactNode
}

export function TaskPreview({ task, onEdit, onDelete, actionsRight }: Props) {
  const title = task.title ?? task.name ?? "Untitled"

  const start = task.start ? new Date(task.start) : undefined
  const end = task.end ? new Date(task.end) : undefined

  const range = ((): string | null => {
    if (task.startTime && task.endTime) return `${task.startTime} - ${task.endTime}`
    if (start && end) {
      const fmt = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      return `${fmt(start)} - ${fmt(end)}`
    }
    return null
  })()

  const day = start ? start.toLocaleDateString() : undefined

  return (
    <div className="relative p-4 bg-white rounded-xl border border-gray-100 shadow-sm transition-all duration-300 group hover:shadow-md dark:bg-gray-800/20 dark:hover:bg-gray-800/40 dark:border-gray-700/50 dark:hover:border-gray-600/50">
      <div className="flex gap-4 justify-between items-start">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {task.iconLeft ?? <CalendarIcon className="w-4 h-4 text-gray-400" />}
            <h3 className="font-medium text-gray-900 truncate dark:text-gray-100">{title}</h3>
          </div>
          {(range || day) && (
            <div className="flex flex-wrap gap-2 items-center mt-1 text-sm">
              {day && (
                <span className="text-gray-500 dark:text-gray-400">{day}</span>
              )}
              {range && (
                <span className="inline-flex items-center gap-1.5 text-gray-800 dark:text-gray-300/80">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="font-medium whitespace-nowrap">{range}</span>
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {actionsRight}
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(task.id)}
              className="w-8 h-8 inline-flex items-center justify-center rounded-md text-gray-500 transition-colors hover:text-blue-500 hover:bg-blue-50 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-500/10"
            >
              <Edit2 className="w-4 h-4" />
              <span className="sr-only">Edit</span>
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(task.id)}
              className="w-8 h-8 inline-flex items-center justify-center rounded-md text-gray-500 transition-colors hover:text-red-500 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4" />
              <span className="sr-only">Delete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskPreview
