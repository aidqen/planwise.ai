'use client'

import { useState } from 'react'
import { GripVertical, Plus, X, Info } from 'lucide-react'
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
import { GoalList } from './GoalList'

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
    <Section className={'py-6 w-full md:p-6'}>
      <Card className="overflow-y-auto mx-auto w-full max-w-2xl bg-transparent border-0 shadow-none">
        <CardContent className="flex flex-col gap-7 p-0 w-full md:p-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 md:text-2xl">
              Set Your Goals
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
              Add goals or tasks you want to accomplish in your schedule. Prioritize them by importance to help us create a more effective schedule for you.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col md:grid md:grid-cols-[1fr_auto] gap-4 bg-white dark:bg-gray-800/50 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50"
          >
            <div className="space-y-4 md:space-y-3">
              <Input
                type="text"
                value={currentGoal}
                onChange={e => setCurrentGoal(e.target.value)}
                placeholder="Enter your goal or task (e.g., 'Complete project proposal')"
                className="w-full text-base rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-100 shadow-sm focus:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Goal Importance
                </label>
                <div className="flex gap-6 items-center">
                  {[
                    { id: 'low', label: 'Low', color: 'text-green-600 dark:text-green-400' },
                    { id: 'medium', label: 'Medium', color: 'text-yellow-600 dark:text-yellow-400' },
                    { id: 'high', label: 'High', color: 'text-red-600 dark:text-red-400' }
                  ].map(priority => (
                    <div key={priority.id} className="flex items-center">
                      <input
                        type="radio"
                        id={priority.id}
                        name="priority"
                        value={priority.id}
                        checked={currentImportance === priority.id}
                        onChange={(e) => setCurrentImportance(e.target.value)}
                        className={`w-4 h-4 ${priority.color} bg-gray-100 border-gray-300 focus:ring-2 focus:ring-offset-2 dark:bg-gray-700 dark:border-gray-600`}
                      />
                      <label
                        htmlFor={priority.id}
                        className={`ml-2 text-sm font-medium ${priority.color} cursor-pointer hover:opacity-80 transition-opacity`}
                      >
                        {priority.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-end">
              <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto px-6 py-2.5 text-white bg-blue-600 rounded-lg shadow-md transition-all hover:bg-blue-700 hover:shadow-lg dark:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!currentGoal.trim()}
              >
                Add Goal
              </Button>
            </div>
          </form>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Goals {goals.length > 0 && `(${goals.length})`}
              </h4>
              {goals.length > 0 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                  Drag to reorder
                </p>
              )}
            </div>

            {goals.length > 0 && (
              <div className="w-full">
                <GoalList
                  goals={goals}
                  saveGoals={saveGoals}
                  updateGoalImportance={updateGoalImportance}
                  removeGoal={removeGoal}
                  importanceColors={importanceColors}
                />
              </div>
            )}
            {goals.length === 0 && (
              <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 dark:bg-gray-800/30 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700">
                <Info className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No goals added yet. Start by adding your first goal above.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Section>
  )
}
