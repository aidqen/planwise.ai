'use client'

import { useState } from 'react'
import { Plus, X, Clock, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from '@/components/ui/section'
import { Routine } from './Routine'
import { AddRoutine } from './AddRoutine'

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
      <div className="container mx-auto bg-transparent shadow-none overflow-y-auto">
        <h1 className="text-xl text-black dark:text-gray-300 my-7">
          Organize your day, boost your productivity
        </h1>
        <AddRoutine newRoutine={newRoutine} setNewRoutine={setNewRoutine} addRoutine={addRoutine}/>
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[11em]">
            {routines.map(routine => (
              <Routine
                routine={routine}
                key={routine.id}
                deleteRoutine={deleteRoutine}
                startEditing={startEditing}
                cancelEditing={cancelEditing}
                saveEdit={saveEdit}
              />
            ))}
          </div>
        </AnimatePresence>
      </div>
    </Section>
  )
}
