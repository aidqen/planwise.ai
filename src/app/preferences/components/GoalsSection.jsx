import { Target } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PreferenceCard, CardHeader, IconWrapper } from './PreferenceCard'
import { AddButton } from './AddButton'
import { GoalForm } from './GoalForm'

function GoalItem({ goal }) {
    console.log("🚀 ~ file: GoalsSection.jsx:9 ~ goal:", goal)
    const priorityColors = {
        high: 'bg-red-500 dark:bg-red-400',
        medium: 'bg-yellow-500 dark:bg-yellow-400',
        low: 'bg-blue-500 dark:bg-blue-400'
    }

    return (
        <div className="p-3 bg-gray-50 rounded-xl transition-all duration-200 group sm:p-4 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-sm">
            <p className="text-sm font-medium text-gray-900 dark:text-white sm:text-base">{goal.name}</p>
            <div className="mt-1 sm:mt-1.5 flex items-center gap-2">
                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-200 ${priorityColors[goal.importance]}`} />
                <p className="text-xs text-gray-600 capitalize sm:text-sm dark:text-gray-400">{goal.importance} Priority</p>
            </div>
        </div>
    )
}

export function GoalsSection({ goals, onAddGoal }) {
    const visibleGoals = goals.slice(0, 5)
    const hasMoreGoals = goals.length > 5

    return (
        <PreferenceCard>
            <CardHeader
                icon={<IconWrapper color="green"><Target className="w-4 h-4 sm:w-5 sm:h-5" /></IconWrapper>}
                title="Goals"
                action={
                    <AddButton title="Add Goal" compact>
                        <GoalForm onSubmit={onAddGoal} />
                    </AddButton>
                }
            />

            <div className="space-y-2 sm:space-y-3">
                {visibleGoals.map((goal, index) => (
                    <GoalItem key={index} goal={goal} />
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
                                {goals.map((goal, index) => (
                                    <GoalItem key={index} goal={goal} />
                                ))}
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </PreferenceCard>
    )
}
