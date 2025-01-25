'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function GoalForm({ onSubmit }) {
  const [goal, setGoal] = useState({ name: '', importance: 'medium' })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(goal)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-gray-500">Goal description</label>
        <Input
          placeholder="Enter your goal"
          value={goal.name}
          onChange={(e) => setGoal({ ...goal, name: e.target.value })}
          required
          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-gray-500">Priority level</label>
        <Select
          value={goal.importance}
          onValueChange={(value) => setGoal({ ...goal, importance: value })}
          >
          <SelectTrigger className="border-gray-200">
            <SelectValue placeholder="Select importance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:shadow transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >
        Add Goal
      </Button>
    </form>
  )
}
