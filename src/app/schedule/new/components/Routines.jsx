'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Section } from '@/components/ui/section'
import { Routine } from './Routine'
import { AddRoutine } from './AddRoutine'
import { useDispatch, useSelector } from 'react-redux'
import { SAVE_ROUTINES } from '@/store/reducers/schedule.reducer'

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
    <Section>
      <div className="flex flex-col max-sm:items-start items-center gap-7 w-full h-full mt-7 pb-10">
        <h1 className="text-xl font-medium text-gray-900 text-center w-full">
          Organize your day, boost your productivity
        </h1>
        <AddRoutine
          newRoutine={newRoutine}
          setNewRoutine={setNewRoutine}
          addRoutine={addRoutine}
          multiStepForm={multiStepForm}
        />
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[11em] w-full">
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
        </AnimatePresence>
      </div>
    </Section>
  )
}
