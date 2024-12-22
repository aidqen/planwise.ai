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
    dispatch({ type: SAVE_GOALS, goals:[...goals, {id:makeId(8), text:currentGoal, importance: currentImportance}] })
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
      <Card className="w-full max-w-2xl mx-auto border-0 shadow-none bg-transparent">
        <CardContent className="p-6 flex flex-col gap-7">
          <h3 className="text-xl font-medium text-gray-900 text-center w-full">
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
              className="w-full col-start-1 row-start-1 border-gray-200 focus:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-lg shadow-sm text-base placeholder:text-gray-400"
            />
            <Select value={currentImportance} onValueChange={setCurrentImportance}>
              <SelectTrigger className="w-full row-start-2 col-start-1 focus:ring-1 focus:ring-blue-500 border-gray-200 rounded-lg">
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
              className="bg-blue-600 hover:bg-blue-700 col-start-2 row-span-2 text-white rounded-lg flex items-center justify-center h-full w-full shadow-md transition-all hover:shadow-lg"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </form>

          <Reorder.Group
            axis="y"
            values={goals}
            onReorder={saveGoals}
            className=" space-y-3 max-h-[50%] overflow-auto"
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
                  <motion.div
                    className={`grid grid-cols-[2.5em_1fr_2.5em] grid-rows-2 justify-between px-4 py-3 rounded-lg shadow-sm border ${
                      importanceColors[goal.importance]
                    } bg-opacity-10`}
                  >
                    <div className="flex items-center space-x-3 row-span-2 col-start-1">
                      <GripVertical className="text-gray-400 cursor-grab h-5 w-5 hover:text-gray-600 active:cursor-grabbing active:text-gray-700 transition-colors duration-200" />
                    </div>
                    <span className="flex items-center text-gray-800 font-medium col-start-2 ps-2 text-base">
                      {goal.text}
                    </span>
                    <div className="flex items-center space-x-2 col-start-2 row-start-2">
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
                      className="flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 active:bg-red-100 col-start-3 row-start-1 rounded-full w-8 h-8 transition-all duration-200"
                    >
                      <X className="h-4 w-4" />
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
