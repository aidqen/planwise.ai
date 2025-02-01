'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Section } from '@/components/ui/section'
import { Routine } from './Routine'
import { AddRoutine } from './AddRoutine'
import { useDispatch, useSelector } from 'react-redux'
import { SAVE_ROUTINES } from '@/store/reducers/schedule.reducer'
import { Info } from 'lucide-react'
import { PredefinedItemsDialog } from '@/components/PredefinedItemsDialog'

export function Routines({ }) {
  const dispatch = useDispatch()
  const multiStepForm = useSelector(state => state.scheduleModule.multiStepForm)
  const user = useSelector(state => state.userModule.user)
  const routines = multiStepForm.routines
  const [newRoutine, setNewRoutine] = useState({
    name: '',
    startTime: '',
    endTime: '',
  })

  function addRoutine() {
    if (newRoutine.name && newRoutine.startTime && newRoutine.endTime) {
      dispatch({ type: SAVE_ROUTINES, routines: [{ ...newRoutine, id: Date.now(), isEditing: false },...routines] })
      setNewRoutine({ name: '', startTime: '', endTime: '' })
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

  const handlePredefinedRoutinesSelect = (selectedRoutines) => {
    const formattedRoutines = selectedRoutines.map(routine => ({
      id: Date.now(), 
      name: routine.name, 
      startTime: routine.startTime || '09:00', 
      endTime: routine.endTime || '10:00'
    }))
    
    dispatch({ 
      type: SAVE_ROUTINES, 
      routines: [...formattedRoutines, ...routines] 
    })
  }

  return (
    <Section className="py-3 w-full md:p-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 space-y-2 text-center md:mb-8">
          <h1 className="text-xl font-medium text-gray-900 dark:text-gray-100 md:text-2xl">
            Set Your Daily Routines
          </h1>
          <p className="mx-auto max-w-lg text-sm text-gray-600 md:text-base dark:text-gray-400">
            Add the unchangeable activities to help us create a schedule that doesn&apos;t interfere with your existing commitments.
          </p>
        </div>

        <div className="space-y-3 md:space-y-8">
          
            <AddRoutine
              newRoutine={newRoutine}
              setNewRoutine={setNewRoutine}
              addRoutine={addRoutine}
              multiStepForm={multiStepForm}
            />
          

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Routines {routines.length > 0 && `(${routines.length})`}
              </h2>
            </div>

            <AnimatePresence>
              {routines.length === 0 ? (
                <div className="flex flex-col justify-center items-center p-8 h-full text-center bg-gray-50 rounded-lg border-2 border-gray-200 border-dashed dark:bg-gray-800/30 dark:border-gray-700">
                  <Info className="mb-2 w-8 h-8 text-gray-400 dark:text-gray-500" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No routines added yet. Start by adding your first routine above.
                  </p>
                  {user?.routines?.length > 0 && (
                    <PredefinedItemsDialog 
                      items={user.routines} 
                      type="Routines" 
                      onSelect={handlePredefinedRoutinesSelect}
                      triggerClassName="mt-4"
                      triggerChildren="Add from Predefined Routines"
                    />
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 w-full">
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
