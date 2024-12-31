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
      <div className="flex gap-4">
        <Input
          type="time"
          value={routine.startTime}
          onChange={(e) => setRoutine({ ...routine, startTime: e.target.value })}
          required
        />
        <Input
          type="time"
          value={routine.endTime}
          onChange={(e) => setRoutine({ ...routine, endTime: e.target.value })}
          required
        />
      </div>
      <Button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600">Add Routine</Button>
    </form>
  )
}

