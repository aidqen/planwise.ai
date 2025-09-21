'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Routine } from './Routine'
import { AddRoutine } from './AddRoutine'
import { useDispatch, useSelector } from 'react-redux'
import { SAVE_ROUTINES } from '@/store/reducers/schedule.reducer'
import { Info } from 'lucide-react'
import { PredefinedItemsDialog } from '@/components/PredefinedItemsDialog'
import EmptyState from '@/components/EmptyState'
import { makeId } from '@/services/util.service'
import { RoutineSearchInput } from './RoutineSearchInput'
import FormWrapper from '@/components/FormWrapper'

export function Routines({ }) {
  const dispatch = useDispatch()
  const multiStepForm = useSelector(state => state.scheduleModule.multiStepForm)
  const user = useSelector(state => state.userModule.user)
  const routines = multiStepForm.routines
  console.log("🚀 ~ file: Routines.jsx:19 ~ routines:", routines)

  // function addRoutine() {
  //   if (newRoutine.name && newRoutine.startTime && newRoutine.endTime) {
  //     dispatch({ type: SAVE_ROUTINES, routines: [{ ...newRoutine, id: makeId(10), isEditing: false },...routines] })
  //     setNewRoutine({ name: '', startTime: '', endTime: '' })
  //   }
  // }

  function handleExistingRoutine(routine) {
    dispatch({ 
      type: SAVE_ROUTINES, 
      routines: [{ ...routine, id: makeId(10), isEditing: false }, ...routines] 
    })
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
      id: makeId(10), 
      name: routine.name, 
      startTime: routine.startTime || '09:00', 
      endTime: routine.endTime || '10:00'
    }))
    
    dispatch({ 
      type: SAVE_ROUTINES, 
      routines: [...formattedRoutines, ...routines] 
    })
  }

  function handleAddRoutine(routine) {
    dispatch({ 
      type: SAVE_ROUTINES, 
      routines: [{ ...routine, id: makeId(10), isEditing: false }, ...routines] 
    })
  }

  return (
    <FormWrapper
      title="Set Your Daily Routines"
      description="Add your unchangeable activities to help us create a schedule that doesn't interfere with your existing commitments."
    >
      <RoutineSearchInput
        routines={routines}
        onAddRoutine={handleAddRoutine}
        multiStepForm={multiStepForm}
        userRoutines={user?.routines || []}
      />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Your Routines {routines.length > 0 && `(${routines.length})`}
          </h2>
        </div>

        <AnimatePresence>
          {routines.length === 0 ? (
            <EmptyState message="No routines added yet. Start by adding your first routine above.">
              {user?.routines?.length > 0 && (
                <PredefinedItemsDialog 
                  items={user.routines} 
                  type="Routines" 
                  onSelect={handlePredefinedRoutinesSelect}
                  triggerClassName="mt-4"
                  triggerChildren="Add from your Routines"
                />
              )}
            </EmptyState>
          ) : (
            <div className="grid grid-cols-1 gap-4 w-full overflow-y-auto max-h-[400px] pb-14 scrollbar-hidden">
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
    </FormWrapper>
  )
}
