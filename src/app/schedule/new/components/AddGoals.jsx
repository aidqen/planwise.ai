'use client'

import { useState } from 'react'
import { GripVertical, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { makeId } from '@/services/util.service'
import { useDispatch, useSelector } from 'react-redux'
import { SAVE_GOALS } from '@/store/reducers/schedule.reducer'
import { Card, CardContent } from '@/components/ui/card'
import { Section } from '@/components/ui/section'

export function AddGoals() {
  const goals = useSelector(state => state.scheduleModule.multiStepForm.goals)
  const [currentGoal, setCurrentGoal] = useState('')
  const [currentImportance, setCurrentImportance] = useState('medium')
  const dispatch = useDispatch()


  function saveGoals() {
    dispatch({ type: SAVE_GOALS, goals:[{id:makeId(8), name:currentGoal, importance: currentImportance},...goals] })
  }

  function addGoal() {
    if (currentGoal.trim()) {
      saveGoals()
      setCurrentGoal('')
      setCurrentImportance('medium')
    }
  }

  function removeGoal(id) {
    const editedGoals = goals.filter(goal => goal.id !== id)
    dispatch({ type: SAVE_GOALS, goals: editedGoals })
  }

  function updateGoalImportance(id, importance) {
    const editedGoals = goals.map(goal => (goal.id === id ? { ...goal, importance } : goal))
    dispatch({ type: SAVE_GOALS, goals: [...editedGoals] })
  }

  function handleSubmit(e) {
    e.preventDefault()
    addGoal()
  }

  const importanceColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  }

  return (
    <Section>
      <Card className="overflow-y-auto mx-auto w-full max-w-2xl bg-transparent border-0 shadow-none">
        <CardContent className="flex flex-col gap-7 p-6">
          <h3 className="w-full text-xl font-medium text-center text-gray-900">
            What would you like to accomplish today?
          </h3>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-[1fr_50px] grid-rows-2 gap-2"
          >
            <Input
              type="text"
              value={currentGoal}
              onChange={e => setCurrentGoal(e.target.value)}
              placeholder="Enter your goal or task"
              className="col-start-1 row-start-1 w-full text-base rounded-lg border-gray-200 shadow-sm focus:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 placeholder:text-gray-400"
            />
            <Select value={currentImportance} onValueChange={setCurrentImportance}>
              <SelectTrigger className="col-start-1 row-start-2 w-full rounded-lg border-gray-200 focus:ring-1 focus:ring-blue-500">
                <SelectValue placeholder="Set priority level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low" className="text-green-700">
                  Low Priority
                </SelectItem>
                <SelectItem value="medium" className="text-yellow-700">
                  Medium Priority
                </SelectItem>
                <SelectItem value="high" className="text-red-700">
                  High Priority
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              type="submit"
              size="icon"
              className="flex col-start-2 row-span-2 justify-center items-center w-full h-full text-white bg-blue-600 rounded-lg shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
            >
              <Plus className="w-6 h-6" />
            </Button>
          </form>

          <Reorder.Group
            axis="y"
            values={goals}
            onReorder={saveGoals}
            className=" space-y-3 max-h-[40%] h-[40%] overflow-y-auto"
          >
            <AnimatePresence>
              {goals.map(goal => (
                <Reorder.Item
                  key={goal.id}
                  value={goal}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.15 }}
                >
                  <motion.div
                    className={`grid grid-cols-[2.5em_1fr_2.5em] grid-rows-2 justify-between px-4 py-3 rounded-lg shadow-sm border ${
                      importanceColors[goal.importance]
                    } bg-opacity-10`}
                  >
                    <div className="flex col-start-1 row-span-2 items-center space-x-3">
                      <GripVertical className="w-5 h-5 text-gray-400 transition-colors duration-200 cursor-grab hover:text-gray-600 active:cursor-grabbing active:text-gray-700" />
                    </div>
                    <span className="flex col-start-2 items-center text-base font-medium text-gray-800 ps-2">
                      {goal.name}
                    </span>
                    <div className="flex col-start-2 row-start-2 items-center space-x-2">
                      <Select
                        value={goal.importance}
                        onValueChange={value => updateGoalImportance(goal.id, value)}
                      >
                        <SelectTrigger
                          className={`w-full border-0 bg-opacity-50 ${
                            importanceColors[goal.importance]
                          }`}
                        >
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low" className="text-green-700">
                            Low
                          </SelectItem>
                          <SelectItem value="medium" className="text-yellow-700">
                            Medium
                          </SelectItem>
                          <SelectItem value="high" className="text-red-700">
                            High
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeGoal(goal.id)}
                      className="flex col-start-3 row-start-1 justify-center items-center w-8 h-8 text-gray-400 rounded-full transition-all duration-200 hover:text-red-600 hover:bg-red-50 active:bg-red-100"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        </CardContent>
      </Card>
    </Section>
  )
}
