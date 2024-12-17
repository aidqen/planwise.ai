'use client'

import React, { useEffect, useState } from 'react'
import { GripVertical, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { makeId } from '@/services/util.service'
import { Section } from '@/components/ui/section'
import { useDispatch, useSelector } from 'react-redux'
import { SAVE_GOALS } from '@/store/reducers/schedule.reducer'

export function AddGoals({ }) {
  const [currentGoal, setCurrentGoal] = useState('')
  const goals = useSelector(state => state.scheduleModule.multiStepForm.goals)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   saveGoals()
  // }, [goals])

  // function saveGoals() {
  //   dispatch({ type: SAVE_GOALS, goals: [...goals] })
  // }

  function addGoal() {
    if (currentGoal.trim()) {
      dispatch({
        type: SAVE_GOALS, goals: [{ id: makeId(8), name: currentGoal.trim() },
        ...goals]
      })
      setCurrentGoal('')
    }
  }

  function removeGoal(id) {
    dispatch({ type: SAVE_GOALS, goals: goals.filter(goal => goal.id !== id) })
  }

  function handleSubmit(e) {
    e.preventDefault()
    addGoal()
  }

  return (
    <Section>
      <div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden">
        {/* <CardContent className="p-6"> */}
        {/* <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Set Your Goals</h2> */}
        <p className="text-xl text-start capitalize w-full text-gray-800 my-7">
          Define what you want to achieve today
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center p-1 space-x-2 ">
            <Input
              type="text"
              value={currentGoal}
              onChange={e => setCurrentGoal(e.target.value)}
              placeholder="Enter your goal"
              className="border rounded-lg px-3 py-2 focus-visible:ring-2 ring-third focus-visible:ring-third transition-all outline-none"
            />
            <Button
              type="submit"
              size="icon"
              className="bg-third shadow-sm border-gray-300 border bg-secondary hover:bg-blue-600 text-blacks rounded-[10px] w-12 h-10 flex items-center justify-center"
            >
              <Plus className="h-8 w-8 text-white" />
            </Button>
          </div>
          <Reorder.Group
            axis="y"
            values={goals}
            onReorder={(newGoals) => dispatch({ type: SAVE_GOALS, goals: newGoals })}
            className="max-h-[20em] overflow-auto"
          >
            <AnimatePresence>
              {goals.map(goal => (
                <Reorder.Item
                  key={goal.id}
                  value={goal}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div className="flex flex-row items-center justify-between bg-gray-50 p-2 rounded-lg">
                    <span className="flex flex-row items-center gap-3 text-gray-800">
                      <GripVertical
                        className="text-gray-800 cursor-grab h-5 w-5 rounded-full "
                        size={19}
                      />
                      {goal.name}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeGoal(goal.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>

          {/* {goals.length > 0 && (
                        <Button type="button" className="w-full bg-green-500 hover:bg-green-600 text-white">
                        Save Goals
                        </Button>
                        )} */}
        </form>
        {/* </CardContent> */}
      </div>
    </Section>
  )
}
