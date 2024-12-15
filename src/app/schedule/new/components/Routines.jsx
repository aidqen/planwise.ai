'use client'

import { useState } from 'react'
import { Plus, X, Clock, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from '@/components/ui/section'

export function Routines() {
  const [routines, setRoutines] = useState([])
  const [newRoutine, setNewRoutine] = useState({
    name: '',
    startTime: '',
    endTime: '',
  })

function addRoutine(e) {
    e.preventDefault()
    if (newRoutine.name && newRoutine.startTime && newRoutine.endTime) {
        setRoutines([...routines, { ...newRoutine, id: Date.now(), isEditing: false }])
        setNewRoutine({ name: '', startTime: '', endTime: '' })
    }
}

function deleteRoutine(id) {
    setRoutines(routines.filter(routine => routine.id !== id))
}

function startEditing(id) {
    setRoutines(
        routines.map(routine =>
            routine.id === id ? { ...routine, isEditing: true } : routine
        )
    )
}

function cancelEditing(id) {
    setRoutines(
        routines.map(routine =>
            routine.id === id ? { ...routine, isEditing: false } : routine
        )
    )
}

function saveEdit(id, editedRoutine) {
    setRoutines(
        routines.map(routine =>
            routine.id === id
                ? { ...routine, ...editedRoutine, isEditing: false }
                : routine
        )
    )
}

  return (
    <Section>
      <div className="container mx-auto">
        <h1 className="text-xl text-black dark:text-gray-300 my-7">
          Organize your day, boost your productivity
        </h1>

        <Card className="mb-8 p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-0">
            <form onSubmit={addRoutine} className="space-y-3">
              <div className="flex flex-col gap-1">
                <Label
                  htmlFor="routineName"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Routine Name
                </Label>
                <Input
                  id="routineName"
                  placeholder="e.g., Morning Workout, Team Meeting"
                  value={newRoutine.name}
                  onChange={e =>
                    setNewRoutine({ ...newRoutine, name: e.target.value })
                  }
                  required
                  className="h-10 px-3 py-2 border rounded-lg shadow-sm 
          focus-visible:ring-2 focus-visible:ring-blue-500 
          focus-visible:ring-offset-2 focus-visible:border-blue-500
          ring-2 ring-blue-200 truncate"
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Label
                    htmlFor="startTime"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
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
                    className="mt-1 text-neutral"
                  />
                </div>
                <div className="flex-1">
                  <Label
                    htmlFor="endTime"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    End Time
                  </Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newRoutine.endTime}
                    onChange={e =>
                      setNewRoutine({ ...newRoutine, endTime: e.target.value })
                    }
                    required
                    className="mt-1 text-neutral"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Routine
              </Button>
            </form>
          </CardContent>
        </Card>

        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[10em]">
            {routines.map(routine => (
              <motion.div
                key={routine.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-max shadow-md hover:shadow-lg transition-shadow duration-300 relative">
                  {routine.isEditing ? (
                    <CardContent className="">
                      <form
                        onSubmit={e => {
                          e.preventDefault()
                          saveEdit(routine.id, {
                            name: e.currentTarget.routineName.value,
                            startTime: e.currentTarget.startTime.value,
                            endTime: e.currentTarget.endTime.value,
                          })
                        }}
                        className="space-y-4"
                      >
                        <div>
                          <Label
                            htmlFor={`routineName-${routine.id}`}
                            className="text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Routine Name
                          </Label>
                          <Input
                            id={`routineName-${routine.id}`}
                            name="routineName"
                            defaultValue={routine.name}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div className="flex space-x-4">
                          <div className="flex-1">
                            <Label
                              htmlFor={`startTime-${routine.id}`}
                              className="text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Start Time
                            </Label>
                            <Input
                              id={`startTime-${routine.id}`}
                              name="startTime"
                              type="time"
                              defaultValue={routine.startTime}
                              required
                              className="mt-1"
                            />
                          </div>
                          <div className="flex-1">
                            <Label
                              htmlFor={`endTime-${routine.id}`}
                              className="text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              End Time
                            </Label>
                            <Input
                              id={`endTime-${routine.id}`}
                              name="endTime"
                              type="time"
                              defaultValue={routine.endTime}
                              required
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => cancelEditing(routine.id)}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="bg-secondary hover:bg-green-600 text-white"
                          >
                            Save
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  ) : (
                    <>
                      <CardHeader className="flex px-6 py-1 flex-row items-center justify-between">
                        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                          {routine.name}
                        </CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="flex items-center justify-center text-gray-400 hover:text-red-600 dark:text-gray-600 dark:hover:text-red-400 transition-colors duration-300"
                        onClick={() => deleteRoutine(routine.id)}
                      >
                        <X className="h-6 w-6" />
                      </Button>
                      </CardHeader>
                      <CardContent className="px-6 pb-4 pt-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                            <Clock className="h-4 w-4" />
                            <span>
                              {routine.startTime} - {routine.endTime}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEditing(routine.id)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-300"
                          >
                            <Edit2 className="h-4 w-4 mr-2" /> Edit
                          </Button>
                        </div>
                      </CardContent>
                    </>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </Section>
  )
}
