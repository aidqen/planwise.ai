import { Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PreferenceCard, CardHeader, IconWrapper } from './PreferenceCard'
import { AddButton } from './AddButton'
import { RoutineForm } from './RoutineForm'

function RoutineItem({ routine }) {
    return (
        <div className="group p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/80 rounded-xl transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-sm">
            <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">{routine.name}</p>
            <div className="mt-1 sm:mt-1.5 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500" />
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {routine.startTime} - {routine.endTime}
                </p>
            </div>
        </div>
    )
}

export function RoutinesSection({ routines, onAddRoutine }) {
    const visibleRoutines = routines.slice(0, 5)
    const hasMoreRoutines = routines.length > 5

    return (
        <PreferenceCard>
            <CardHeader
                icon={<IconWrapper color="purple"><Clock className="w-4 h-4 sm:w-5 sm:h-5" /></IconWrapper>}
                title="Routines"
                action={
                    <AddButton title="Add Routine" compact>
                        <RoutineForm onSubmit={onAddRoutine} />
                    </AddButton>
                }
            />

            <div className="space-y-2 sm:space-y-3">
                {visibleRoutines.map((routine, index) => (
                    <RoutineItem key={index} routine={routine} />
                ))}
                
                {hasMoreRoutines && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button 
                                variant="ghost" 
                                className="w-full text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                            >
                                View {routines.length - 5} more routines
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                            <DialogHeader className="border-b border-gray-100 dark:border-gray-800 pb-4">
                                <DialogTitle className="text-gray-900 dark:text-white">All Routines</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-2 sm:space-y-3 max-h-[60vh] overflow-y-auto py-4 px-1">
                                {routines.map((routine, index) => (
                                    <RoutineItem key={index} routine={routine} />
                                ))}
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </PreferenceCard>
    )
}
