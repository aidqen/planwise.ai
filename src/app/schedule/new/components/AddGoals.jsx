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
import { reorderGoals } from '@/store/actions/schedule.actions'
import { PredefinedItemsDialog } from '@/components/PredefinedItemsDialog'

export function AddGoals() {
  const goals = useSelector(state => state.scheduleModule.multiStepForm.goals)
  const [currentGoal, setCurrentGoal] = useState('')
  const [currentImportance, setCurrentImportance] = useState('medium')
  const user = useSelector(state => state.userModule.user)
  const dispatch = useDispatch()

  function saveGoals() {
    dispatch({ type: SAVE_GOALS, goals:[{id:makeId(8), name:currentGoal, importance: currentImportance},...goals] })
    setCurrentGoal('')
    setCurrentImportance('medium')
  }

  function handleReorder(newOrder) {
    dispatch(reorderGoals(newOrder))
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
    low: 'text-green-800',
    medium: 'text-yellow-800',
    high: 'text-red-800',
  }

  const handlePredefinedGoalsSelect = (selectedGoals) => {
    const formattedGoals = selectedGoals.map(goal => ({
      id: makeId(8), 
      name: goal.name, 
      importance: goal.importance || 'medium'
    }))
    
    dispatch({ 
      type: SAVE_GOALS, 
      goals: [...formattedGoals, ...goals] 
    })
  }

  return (
    <Section className={'pt-3 pb-0 w-full md:p-6'}>
      <Card className="overflow-y-auto mx-auto w-full max-w-2xl bg-transparent border-0 shadow-none">
        <CardContent className="flex flex-col gap-7 p-0 w-full md:p-6">
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 md:text-2xl">
              Set Your Goals
            </h3>
            <p className="mx-auto max-w-lg text-sm text-gray-600 md:text-sm lg:text-base dark:text-gray-400">
              Add the goals you want to work on in your schedule. Prioritize them by how much time each goal requires.
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
                className="w-full text-base rounded-lg border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-100 focus:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-500"
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
                <p className="text-xs italic text-gray-500 dark:text-gray-400">
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
                  handleReorder={handleReorder}
                />
              </div>
            )}
            {goals.length === 0 && (
              <div className="flex flex-col justify-center items-center p-4 text-center bg-gray-50 rounded-lg border-2 border-gray-200 border-dashed dark:bg-gray-800/30 dark:border-gray-700">
                <Info className="mb-2 w-8 h-8 text-gray-400 dark:text-gray-500" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No goals added yet. Start by adding your first goal above.
                </p>
                {user?.goals?.length > 0 && (
                  <PredefinedItemsDialog 
                    items={user.goals} 
                    type="Goals" 
                    onSelect={handlePredefinedGoalsSelect}
                    triggerClassName="mt-4"
                    triggerChildren="Add from Predefined Goals"
                  />
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Section>
  )
}
