'use client'
import { useState, useMemo } from 'react'
import { makeId } from '@/services/util.service'
import { useDispatch, useSelector } from 'react-redux'
import { SAVE_GOALS } from '@/store/reducers/schedule.reducer'
import { GoalList } from './GoalList'
import { reorderGoals } from '@/store/actions/schedule.actions'
import { PredefinedItemsDialog } from '@/components/PredefinedItemsDialog'
import { GoalSearchInput } from './GoalSearchInput'
import EmptyState from '@/components/EmptyState'
import FormWrapper from '@/components/FormWrapper'

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
    <FormWrapper
      title="Set Your Goals"
      description="Add the goals you want to work on in your schedule. Prioritize them by how much time each goal requires."
    >
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

      <div className="space-y-3">
          <h4 className="text-sm font-medium text-black dark:text-white">
            Your Goals {goals.length > 0 && `(${goals.length})`}
          </h4>

        {goals.length > 0 ? (
          <GoalList
            goals={goals}
            updateGoalImportance={updateGoalImportance}
            removeGoal={removeGoal}
            handleReorder={handleReorder}
          />
        ) : (
          <EmptyState message="No goals added yet. Start by adding your first goal above.">
            {user?.goals?.length > 0 && (
              <PredefinedItemsDialog
                items={user.goals}
                type="Goals"
                onSelect={handlePredefinedGoalsSelect}
                triggerClassName="mt-4"
                triggerChildren="Add from your Goals"
              />
            )}
          </EmptyState>
        )}
      </div>
    </FormWrapper>
  )
}
