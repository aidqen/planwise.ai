'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown } from 'lucide-react'
import { CategoryItem } from './CategoryItem'

const categories = [
    {
        id: 'break',
        name: 'Break',
        color: '#3b82f6',
    },
    {
        id: 'goal',
        name: 'Goal',
        color: '#06b6d4',
    },
    {
        id: 'routine',
        name: 'Routine',
        color: '#0284c7',
    },
    {
        id: 'meal',
        name: 'Meal',
        color: '#22c55e',
    },
]

export function CategoryDropdown({ tasks }) {
    const [openCategory, setOpenCategory] = useState(null)

    const toggleCategory = (categoryName) => {
        setOpenCategory(openCategory === categoryName ? null : categoryName)
    }

    return (
        <Card className="relative overflow-hidden mx-auto w-[20em] pt-16 max-w-md bg-transparent hidden md:block h-full">
            {/* <div className="absolute bottom-0 left-0 z-0 w-full h-screen bg-white"></div> */}
            <CardHeader className="flex flex-col gap-1.5 pt-0 pb-6 space-y-0">
                <CardTitle className="text-lg font-semibold text-black">
                    Task Categories
                </CardTitle>
                <CardDescription className="mt-0 text-sm font-medium text-gray-600 dark:text-gray-300">
                    View more details about your tasks
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                {categories.map((category) => (
                    <CategoryItem
                        key={category.name}
                        category={category}
                        isOpen={openCategory === category.name}
                        tasks={tasks.filter((task) => task.category === category.id)}
                        onToggle={() => toggleCategory(category.name)}
                    />
                ))}
            </CardContent>
        </Card>
    )
}

