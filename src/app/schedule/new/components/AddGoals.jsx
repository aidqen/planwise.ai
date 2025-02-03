'use client'
import { useState, useMemo } from 'react'
import { Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { makeId } from '@/services/util.service'
import { useDispatch, useSelector } from 'react-redux'
import { SAVE_GOALS } from '@/store/reducers/schedule.reducer'
import { Card, CardContent } from '@/components/ui/card'
import { Section } from '@/components/ui/section'
import { GoalList } from './GoalList'
import { reorderGoals } from '@/store/actions/schedule.actions'
import { PredefinedItemsDialog } from '@/components/PredefinedItemsDialog'
import { GoalSearchInput } from './GoalSearchInput'

export function AddGoals() {
  const goals = useSelector(state => state.scheduleModule.multiStepForm.goals)
  const [currentGoal, setCurrentGoal] = useState('')
  const [currentImportance, setCurrentImportance] = useState('medium')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const user = useSelector(state => state.userModule.user)
  const dispatch = useDispatch()

  const filteredUserGoals = useMemo(() => {
    return user?.goals?.filter(goal =>
      goal.name.toLowerCase().includes(currentGoal.toLowerCase())
    ) || []
  }, [user?.goals, currentGoal])

  function handleAddGoal(goal) {
    const existingGoal = goals.find(g => g.id === goal.id)
    if (!existingGoal) {
      dispatch({
        type: SAVE_GOALS,
        goals: [...goals, goal]
      })
    }
    setCurrentGoal('')
    setIsDropdownOpen(false)
  }

  function createCustomGoal() {
    if (currentGoal.trim()) {
      const newGoal = {
        name: currentGoal,
        importance: currentImportance,
        id: makeId(8)
      }
      handleAddGoal(newGoal)
    }
  }

  function handleReorder(newOrder) {
    dispatch(reorderGoals(newOrder))
  }

  function removeGoal(id) {
    const editedGoals = goals.filter(goal => goal.id !== id)
    dispatch({ type: SAVE_GOALS, goals: editedGoals })
  }

  function updateGoalImportance(id, importance) {
    const editedGoals = goals.map(goal => (goal.id === id ? { ...goal, importance } : goal))
    dispatch({ type: SAVE_GOALS, goals: [...editedGoals] })
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
    <Section className="pt-10 pb-0 w-full md:p-6">
      <Card className="overflow-y-auto mx-auto w-full max-w-2xl bg-transparent border-0 shadow-none">
        <CardContent className="flex flex-col gap-8 p-0 w-full md:p-6">
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 md:text-2xl">
              Set Your Goals
            </h3>
            <p className="mx-auto max-w-lg text-sm text-gray-600 md:text-sm lg:text-base dark:text-gray-400">
              Add the goals you want to work on in your schedule. Prioritize them by how much time each goal requires.
            </p>
          </div>

          {/* <div className="p-4 w-full bg-white rounded-xl border border-gray-100 shadow-sm dark:bg-gray-900 dark:border-gray-700"> */}
            <GoalSearchInput
              currentGoal={currentGoal}
              setCurrentGoal={setCurrentGoal}
              currentImportance={currentImportance}
              setCurrentImportance={setCurrentImportance}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
              filteredUserGoals={filteredUserGoals}
              goals={goals}
              onAddGoal={handleAddGoal}
              onCreateGoal={createCustomGoal}
            />
          {/* </div> */}

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

            {goals.length > 0 ? (
              <div className="w-full">
                <GoalList
                  goals={goals}
                  updateGoalImportance={updateGoalImportance}
                  removeGoal={removeGoal}
                  handleReorder={handleReorder}
                />
              </div>
            ) : (
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
                    triggerChildren="Add from your Goals"
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
