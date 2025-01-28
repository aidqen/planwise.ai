'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import TimePicker from '@/components/TimePicker'

export function RoutineForm({ onAddRoutine, onSubmitRoutines, localRoutines, setLocalRoutines }) {
  const [routine, setRoutine] = useState({
    text: '',
    startTime: '',
    endTime: ''
  })

  const handleAddRoutine = (e) => {
    e.preventDefault()
    if (routine.text.trim() && routine.startTime && routine.endTime) {
      const newRoutine = { 
        ...routine, 
        id: Date.now(),
        name: routine.text  // Rename text to name for consistency
      }
      setLocalRoutines([...localRoutines, newRoutine])
      onAddRoutine(newRoutine)
      // Reset form
      setRoutine({
        text: '',
        startTime: '',
        endTime: ''
      })
    }
  }

  const handleSubmitRoutines = () => {
    onSubmitRoutines(localRoutines)
    setLocalRoutines([])
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddRoutine} className="space-y-4">
        <Input
          placeholder="Enter routine description"
          value={routine.text}
          onChange={(e) => setRoutine({ ...routine, text: e.target.value })}
          required
          className="border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
        <div className="flex flex-row gap-4 w-full">
          <div className="flex flex-col w-full">
            <label htmlFor="startTime" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Start Time
            </label>
            <TimePicker
              value={routine.startTime}
              onChange={(value) => setRoutine({ ...routine, startTime: value })}
              placeholder="Select start time"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="endTime" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              End Time
            </label>
            <TimePicker
              value={routine.endTime}
              onChange={(value) => setRoutine({ ...routine, endTime: value })}
              placeholder="Select end time"
            />
          </div>
        </div>
        <Button 
          type="submit" 
          className="w-full text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          disabled={!routine.text || !routine.startTime || !routine.endTime}
        >
          Add Routine
        </Button>
      </form>

      {localRoutines.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Routines to Submit:</h4>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {localRoutines.map((routine) => (
              <div 
                key={routine.id} 
                className="p-2 bg-gray-50 rounded-lg flex justify-between items-center dark:bg-gray-800"
              >
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">{routine.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {routine.startTime} - {routine.endTime}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setLocalRoutines(localRoutines.filter(r => r.id !== routine.id))}
                  className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <Button 
            onClick={handleSubmitRoutines}
            className="w-full bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
            disabled={localRoutines.length === 0}
          >
            Submit Routines
          </Button>
        </div>
      )}
    </div>
  )
}
