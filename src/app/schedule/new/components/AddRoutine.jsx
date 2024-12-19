import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function AddRoutine({ newRoutine, setNewRoutine, addRoutine }) {
  const [errorMessage, setErrorMessage] = useState('')
  const [endTimeError, setEndTimeError] = useState(false)

  const { startTime, endTime } = newRoutine

  useEffect(() => {
    let timer
    validateStartEndTime()
    if (errorMessage) {
      timer = setTimeout(() => setErrorMessage(''), 1000)
    }
    return () => clearTimeout(timer)
  }, [errorMessage, newRoutine])

  function validateStartEndTime() {
    if (startTime && endTime && startTime >= endTime) {
      setEndTimeError(true)
    } else setEndTimeError(false)
  }

  function handleSubmit(ev) {
    ev.preventDefault()

    if (startTime && endTime && startTime >= endTime) {
      setErrorMessage('End time must be later than start time.')
      return
    }

    setErrorMessage('')
    addRoutine()
  }

  return (
    <Card className="mb-8 p-5 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="space-y-4 relative">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="routineName"
              className="text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Routine Name
            </Label>
            <Input
              id="routineName"
              placeholder="e.g., Morning Workout, Team Meeting"
              value={newRoutine.name}
              onChange={e => setNewRoutine({ ...newRoutine, name: e.target.value })}
              required
              className="h-11 px-4 py-2 border border-gray-200 rounded-lg shadow-sm
                focus-visible:ring-2 focus-visible:ring-blue-500/50
                focus-visible:border-blue-500 
                placeholder:text-gray-400
                transition-all duration-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="startTime"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Start Time
              </Label>
              <Input
                id="startTime"
                type="time"
                value={newRoutine.startTime}
                onChange={e =>
                  setNewRoutine({ ...newRoutine, startTime: e.target.value })
                }
                required
                className="h-11 px-4 py-2 border border-gray-200 rounded-lg shadow-sm
                  focus-visible:ring-2 focus-visible:ring-blue-500/50
                  focus-visible:border-blue-500
                  transition-all duration-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="endTime"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                End Time
              </Label>
              <div className="relative">
                <Input
                  id="endTime"
                  type="time"
                  value={newRoutine.endTime}
                  onChange={e =>
                    setNewRoutine({ ...newRoutine, endTime: e.target.value })
                  }
                  required
                  className={`h-11 px-4 py-2 border rounded-lg shadow-sm
                    focus-visible:ring-2 focus-visible:ring-blue-500/50
                    focus-visible:border-blue-500
                    transition-all duration-200
                    ${endTimeError ? 'border-red-500 focus-within:ring-red-500' : 'border-gray-200'}`}
                />

                <AnimatePresence>
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: -10 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-[120%] left-0 w-full bg-red-50 text-red-600 text-sm rounded-lg shadow-lg px-3 py-2 border border-red-200"
                    >
                      {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Plus className="mr-2 h-5 w-5" /> Add Routine
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
