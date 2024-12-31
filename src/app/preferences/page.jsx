'use client'

import { useState } from 'react'
import { Plus, Target, Clock, Settings2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { GoalForm } from './components/GoalForm'
import { RoutineForm } from './components/RoutineForm'
import { PreferenceForm } from './components/PreferenceForm'
// import { motion } from 'framer-motion'
// import { ScrollArea } from "@/components/ui/scroll-area"
import { ItemList } from './components/ItemList'
import { AddButton } from './components/AddButton'
import { PreferenceSection } from './components/PreferenceSection'

export default function PlanwiseDashboard() {
    const [goals, setGoals] = useState([])
    const [routines, setRoutines] = useState([])
    const [preferences, setPreferences] = useState({
        wakeupTime: '07:00',
        sleepTime: '22:00',
        intensity: 'medium'
    })

    const addGoal = (newGoal) => {
        setGoals([...goals, newGoal])
    }

    const addRoutine = (newRoutine) => {
        setRoutines([...routines, newRoutine])
    }

    const updatePreferences = (newPreferences) => {
        setPreferences(newPreferences)
    }

    return (
        <div className="p-6 px-20 w-full min-h-screen">
            <div className="mx-auto max-w-7xl">
                <h1 className="mb-1 text-2xl font-medium text-gray-900">Your Preferences</h1>
                <p className='mb-6 text-base text-neutral'>Manage your goals, routines and preferences to get the best results for your schedule.</p>

                <div className="grid gap-2 rows-3">
                    <PreferenceSection
                        title="Preferences"
                        icon={<Settings2 className="w-4 h-4 text-blue-500" />}
                        description="Schedule settings"
                    >
                        <div className="p-3 mb-2 rounded-lg">
                            <div className="flex flex-row items-center space-x-5">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">intensity</p>
                                    <p className="text-sm text-gray-600 capitalize font-regular">{preferences.intensity}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Wakeup</p>
                                    <p className="text-sm text-gray-600 capitalize font-regular">{preferences.wakeupTime}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Sleep</p>
                                    <p className="text-sm text-gray-600 capitalize font-regular">{preferences.sleepTime}</p>
                                </div>
                            </div>
                        </div>
                        <AddButton title="Edit Preferences" compact>
                            <PreferenceForm onSubmit={updatePreferences} initialPreferences={preferences} />
                        </AddButton>
                    </PreferenceSection>

                    <PreferenceSection
                        title="Goals"
                        icon={<Target className="w-4 h-4 text-blue-500" />}
                        description="Track your objectives"
                    >
                        <AddButton title="Add Goal" compact>
                            <GoalForm onSubmit={addGoal} />
                        </AddButton>
                        <ItemList
                            items={goals}
                            renderItem={(goal, index) => (
                                <div className="p-3 mb-2 bg-gray-50 rounded-lg">
                                    <p className="text-sm font-medium text-gray-900">{goal.text}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Priority: {goal.importance}</p>
                                </div>
                            )}
                        />
                    </PreferenceSection>

                    <PreferenceSection
                        title="Routines"
                        icon={<Clock className="w-4 h-4 text-blue-500" />}
                        description="Daily activities"
                    >
                        <AddButton title="Add Routine" compact>
                            <RoutineForm onSubmit={addRoutine} />
                        </AddButton>
                        <ItemList
                            items={routines}
                            renderItem={(routine, index) => (
                                <div className="p-3 mb-2 bg-gray-50 rounded-lg">
                                    <p className="text-sm font-medium text-gray-900">{routine.text}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{routine.startTime} - {routine.endTime}</p>
                                </div>
                            )}
                        />
                    </PreferenceSection>

                </div>
            </div>
        </div>
    )
}
