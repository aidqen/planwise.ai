'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Section } from '@/components/ui/section'
import { Routine } from './Routine'
import { AddRoutine } from './AddRoutine'
import { useDispatch, useSelector } from 'react-redux'
import { SAVE_ROUTINES } from '@/store/reducers/schedule.reducer'
import { Info } from 'lucide-react'

export function Routines({ }) {
  const dispatch = useDispatch()
  const multiStepForm = useSelector(state => state.scheduleModule.multiStepForm)
  const routines = multiStepForm.routines
  const [newRoutine, setNewRoutine] = useState({
    name: '',
    startTime: '',
    endTime: '',
  })
  
  function saveRoutines() {
    if (routines.length) dispatch({ type: SAVE_ROUTINES, routines: [...routines] })
  }

  function addRoutine() {
    if (newRoutine.name && newRoutine.startTime && newRoutine.endTime) {
      dispatch({ type: SAVE_ROUTINES, routines: [{ ...newRoutine, id: Date.now(), isEditing: false },...routines] })
      setNewRoutine({ name: '', startTime: '', endTime: '' })
      saveRoutines()
    }
  }

  function deleteRoutine(id) {
    const editedRoutines = routines.filter(routine => routine.id !== id)
    dispatch({ type: SAVE_ROUTINES, routines: [...editedRoutines] })
  }

  function toggleEditing(id, isEditing) {
    const editedRoutines = routines.map(routine =>
      routine.id === id ? { ...routine, isEditing } : routine
    )
    dispatch({ type: SAVE_ROUTINES, routines: [...editedRoutines] })
  }

  function saveEdit(id, editedRoutine) {
    const editedRoutines = routines.map(routine =>
        routine.id === id
          ? { ...routine, ...editedRoutine, isEditing: false }
          : routine
      )
    dispatch({ type: SAVE_ROUTINES, routines: [...editedRoutines] })
  }

  return (
    <Section className="py-6 w-full md:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 md:text-2xl">
            Set Your Daily Routines
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            Add your regular daily activities to help us create a schedule that works around your existing commitments.
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 p-6">
            <AddRoutine
              newRoutine={newRoutine}
              setNewRoutine={setNewRoutine}
              addRoutine={addRoutine}
              multiStepForm={multiStepForm}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Routines {routines.length > 0 && `(${routines.length})`}
              </h2>
            </div>

            <AnimatePresence>
              {routines.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 dark:bg-gray-800/30 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700">
                  <Info className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No routines added yet. Start by adding your first routine above.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 w-full lg:grid-cols-2">
                  {routines.map(routine => (
                    <Routine
                      routine={routine}
                      key={routine.id}
                      deleteRoutine={deleteRoutine}
                      toggleEditing={toggleEditing}
                      saveEdit={saveEdit}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  )
}
