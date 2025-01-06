'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CategoryDropdown } from './CategoryDropdown'
import { RoutinesSection } from './RoutinesSection'
import { GoalsSection } from './GoalsSection'
import { PreferencesSection } from './PreferencesSection'








export function ScheduleSidebar({ schedule }) {
    const [openSection, setOpenSection] = useState(null)

    const toggleSection = (sectionName) => {
        setOpenSection(openSection === sectionName ? null : sectionName)
    }

    return (
        <Card className="relative overflow-x-hidden overflow-y-auto mx-auto w-[20em] pt-16 max-w-md bg-transparent hidden md:block h-full">
            <CardHeader className="flex flex-col gap-1.5 pt-0 pb-6 space-y-0">
                <CardTitle className="text-lg font-semibold text-black">
                    Schedule Details
                </CardTitle>
                <CardDescription className="mt-0 text-sm font-medium text-gray-600 dark:text-gray-300">
                    View your preferences and tasks
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <PreferencesSection 
                    preferences={schedule?.preferences} 
                    isOpen={openSection === 'preferences'}
                    onToggle={() => toggleSection('preferences')}
                />
                <GoalsSection 
                    goals={schedule?.goals} 
                    isOpen={openSection === 'goals'}
                    onToggle={() => toggleSection('goals')}
                />
                <RoutinesSection 
                    routines={schedule?.routines} 
                    isOpen={openSection === 'routines'}
                    onToggle={() => toggleSection('routines')}
                />
                <CategoryDropdown schedule={schedule} />
            </CardContent>
        </Card>
    )
}
