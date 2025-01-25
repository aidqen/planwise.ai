'use client'

import { useState } from 'react'
import { PreferencesHeader } from './components/PreferencesHeader'
import { ScheduleSettings } from './components/ScheduleSettings'
import { GoalsSection } from './components/GoalsSection'
import { RoutinesSection } from './components/RoutinesSection'

export default function PlanwiseDashboard() {
    const [goals, setGoals] = useState([])
    const [routines, setRoutines] = useState([])
    const [preferences, setPreferences] = useState({
        wakeup: '07:00',
        sleep: '22:00',
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
        <div className="flex flex-col w-full min-h-screen md:h-full">
            <div className="flex-1 md:flex md:items-center">
                <div className="w-full">
                    <PreferencesHeader />
                    
                    <div className="px-4 py-8 sm:px-6 md:px-8 lg:px-12">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                            <ScheduleSettings 
                                preferences={preferences}
                                onUpdate={updatePreferences}
                            />
                            <GoalsSection 
                                goals={goals}
                                onAddGoal={addGoal}
                            />
                            <RoutinesSection 
                                routines={routines}
                                onAddRoutine={addRoutine}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
