'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function RoutineForm({ onSubmit }) {
  const [routine, setRoutine] = useState({ text: '', startTime: '', endTime: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(routine)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Enter routine description"
        value={routine.text}
        onChange={(e) => setRoutine({ ...routine, text: e.target.value })}
        required
      />
      <div className="flex flex-row w-full gap-4">
        <div className="flex flex-col  w-full">
          <label htmlFor="startTime" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Start Time
          </label>
          <Input
            id="startTime"
            type="time"
            value={routine.startTime}
            onChange={(e) => setRoutine({ ...routine, startTime: e.target.value })}
            className="pe-5 pl-2 text-left w-full flex justify-end"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="endTime" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            End Time
          </label>
          <Input
            id="endTime"
            type="time"
            value={routine.endTime}
            onChange={(e) => setRoutine({ ...routine, endTime: e.target.value })}
            className="pe-5 pl-2 text-left w-full flex justify-end"
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600">Add Routine</Button>
    </form>
  )
}

