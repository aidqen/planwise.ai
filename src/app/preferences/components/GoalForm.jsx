'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2 } from 'lucide-react'

export function GoalForm({ onAddGoal, onSubmitGoals, localGoals, setLocalGoals }) {
  const [goal, setGoal] = useState({ name: '', importance: 'medium' })

  const handleAddGoal = (e) => {
    e.preventDefault()
    if (goal.name.trim()) {
      const newGoal = { 
        ...goal, 
        id: Date.now() 
      }
      onAddGoal(newGoal)
      setGoal({ name: '', importance: 'medium' })
    }
  }

  const handleSubmitGoals = () => {
    onSubmitGoals(localGoals)
  }

  return (
    <div className=''>
      <form onSubmit={handleAddGoal} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-600 dark:text-gray-300">Goal description</label>
          <Input
            placeholder="Enter your goal"
            value={goal.name}
            onChange={(e) => setGoal({ ...goal, name: e.target.value })}
            required
            className="border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-600 dark:text-gray-300">Priority level</label>
          <Select
            value={goal.importance}
            onValueChange={(value) => setGoal({ ...goal, importance: value })}
          >
            <SelectTrigger className="border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
              <SelectValue placeholder="Select importance" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="low" className="dark:hover:bg-gray-700 dark:focus:bg-gray-700">Low</SelectItem>
              <SelectItem value="medium" className="dark:hover:bg-gray-700 dark:focus:bg-gray-700">Medium</SelectItem>
              <SelectItem value="high" className="dark:hover:bg-gray-700 dark:focus:bg-gray-700">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button 
          type="submit" 
          className="px-4 py-2 w-full font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow-sm transition-all duration-200 hover:from-blue-700 hover:to-blue-600 dark:from-blue-700 dark:to-blue-600 dark:hover:from-blue-800 dark:hover:to-blue-700 hover:shadow focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900"
        >
          Add Goal
        </Button>
      </form>

      {localGoals.length > 0 && (
        <div className="mt-4 space-y-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Goals to Submit:</h4>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {localGoals.map((goal) => (
              <div 
                key={goal.id} 
                className="flex justify-between items-center p-2 bg-gray-50 rounded-lg group dark:bg-gray-800"
              >
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">{goal.name}</p>
                  <p className="text-xs text-gray-600 capitalize dark:text-gray-400">{goal.importance} Priority</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setLocalGoals(localGoals.filter(g => g.id !== goal.id))}
                  className="text-red-500 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button 
            onClick={handleSubmitGoals}
            className="mt-8 w-full text-white bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
            disabled={localGoals.length === 0}
          >
            Submit Goals
          </Button>
        </div>
      )}
    </div>
  )
}
