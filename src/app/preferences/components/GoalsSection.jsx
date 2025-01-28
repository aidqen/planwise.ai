'use client'
import { useState } from 'react'
import { Target } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PreferenceCard, CardHeader, IconWrapper } from './PreferenceCard'
import { AddButton } from './AddButton'
import { GoalForm } from './GoalForm'
import { Trash2 } from 'lucide-react'

function GoalItem({ goal, onRemove }) {
    const [onHover, setOnHover] = useState(false)
    const priorityColors = {
        high: 'bg-red-500 dark:bg-red-400',
        medium: 'bg-yellow-500 dark:bg-yellow-400',
        low: 'bg-blue-500 dark:bg-blue-400'
    }

    return (
        <div onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl transition-colors dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50">
            <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{goal.name}</p>
                <div className="mt-1 sm:mt-1.5 flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-200 ${priorityColors[goal.importance]}`} />
                    <p className="text-xs text-gray-600 capitalize sm:text-sm dark:text-gray-400">{goal.importance} Priority</p>
                </div>
            </div>
            {onHover && (
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    onClick={() => onRemove(goal)}
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            )}
        </div>
    )
}

export function GoalsSection({goals, handleUserUpdate, handleRemoveItem}) {
    const [localGoals, setLocalGoals] = useState([])

    const onAddGoal = (newGoal) => {
        setLocalGoals([...localGoals, newGoal])
    }

    const onSubmitGoals = (goalsToSubmit) => {
        const updatedGoals = goals?.length ? [...goals, ...goalsToSubmit] : [...goalsToSubmit] 
        handleUserUpdate('goals', updatedGoals)
        setLocalGoals([]) // Clear local goals after submission
    }

    const visibleGoals = goals?.slice(0, 5)
    const hasMoreGoals = goals?.length > 5

    return (
        <PreferenceCard>
            <CardHeader
                icon={<IconWrapper color="green"><Target className="w-4 h-4 sm:w-5 sm:h-5" /></IconWrapper>}
                title="Goals"
                action={
                    <AddButton title="Add Goal" description='Add a new goal to easily create schedules and track your progress.' compact>
                        <GoalForm 
                            onAddGoal={onAddGoal} 
                            onSubmitGoals={onSubmitGoals} 
                            localGoals={localGoals} 
                            setLocalGoals={setLocalGoals} 
                        />
                    </AddButton>
                }
            />

            <div className="space-y-2 sm:space-y-3">
                {visibleGoals?.map((goal, index) => (
                    <GoalItem 
                        key={index} 
                        goal={goal} 
                        onRemove={(goalId) => handleRemoveItem('goals', goalId)} 
                    />
                ))}

                {hasMoreGoals && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="ghost"
                                className="w-full text-xs text-gray-600 transition-colors duration-200 sm:text-sm dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                            >
                                View {goals.length - 5} more goals
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white border-gray-200 sm:max-w-md dark:bg-gray-900 dark:border-gray-800">
                            <DialogHeader className="pb-4 border-b border-gray-100 dark:border-gray-800">
                                <DialogTitle className="text-gray-900 dark:text-white">All Goals</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-2 sm:space-y-3 max-h-[60vh] overflow-y-auto py-4 px-1">
                                {goals?.map((goal, index) => (
                                    <GoalItem 
                                        key={index} 
                                        goal={goal} 
                                        onRemove={(goalId) => handleRemoveItem('goals', goalId)} 
                                    />
                                ))}
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </PreferenceCard>
    )
}
