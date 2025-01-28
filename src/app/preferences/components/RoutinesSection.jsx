'use client'
import { useState } from 'react'
import { Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PreferenceCard, CardHeader, IconWrapper } from './PreferenceCard'
import { AddButton } from './AddButton'
import { RoutineForm } from './RoutineForm'
import { Trash2 } from 'lucide-react'

function RoutineItem({ routine, onRemove }) {
    const [onHover, setOnHover] = useState(false)
    return (
        <div onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl transition-colors dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50">
            <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{routine.name}</p>
                <div className="mt-1 sm:mt-1.5 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500" />
                    <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                        {routine.startTime} - {routine.endTime}
                    </p>
                </div>
            </div>
            {onHover && (
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    onClick={() => onRemove(routine.id || routine)}
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            )}
        </div>
    )
}

export function RoutinesSection({ routines, handleUserUpdate, handleRemoveItem }) {
    const [localRoutines, setLocalRoutines] = useState([])

    const onAddRoutine = (newRoutine) => {
        setLocalRoutines([...localRoutines, newRoutine])
    }

    const onSubmitRoutines = (routinesToSubmit) => {
        const updatedRoutines = routines?.length ? [...routines, ...routinesToSubmit] : [...routinesToSubmit] 
        handleUserUpdate('routines', updatedRoutines)
        setLocalRoutines([]) // Clear local routines after submission
    }

    const visibleRoutines = routines?.slice(0, 5)
    const hasMoreRoutines = routines?.length > 5

    return (
        <PreferenceCard>
            <CardHeader
                icon={<IconWrapper color="purple"><Clock className="w-4 h-4 sm:w-5 sm:h-5" /></IconWrapper>}
                title="Routines"
                action={
                    <AddButton title="Add Routine" description='Add a new routine to easily customize your schedules.' compact>
                        <RoutineForm 
                            onAddRoutine={onAddRoutine} 
                            onSubmitRoutines={onSubmitRoutines} 
                            localRoutines={localRoutines} 
                            setLocalRoutines={setLocalRoutines} 
                        />
                    </AddButton>
                }
            />

            <div className="space-y-2 sm:space-y-3">
                {visibleRoutines?.map((routine, index) => (
                    <RoutineItem 
                        key={index} 
                        routine={routine} 
                        onRemove={(routineId) => handleRemoveItem('routines', routineId)} 
                    />
                ))}

                {hasMoreRoutines && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button 
                                variant="ghost" 
                                className="w-full text-xs text-gray-600 transition-colors duration-200 sm:text-sm dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                            >
                                View {routines.length - 5} more routines
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white border-gray-200 sm:max-w-md dark:bg-gray-900 dark:border-gray-800">
                            <DialogHeader className="pb-4 border-b border-gray-100 dark:border-gray-800">
                                <DialogTitle className="text-gray-900 dark:text-white">All Routines</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-2 sm:space-y-3 max-h-[60vh] overflow-y-auto py-4 px-1">
                                {routines?.map((routine, index) => (
                                    <RoutineItem 
                                        key={index} 
                                        routine={routine} 
                                        onRemove={(routineId) => handleRemoveItem('routines', routineId)} 
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
