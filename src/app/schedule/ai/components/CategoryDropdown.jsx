'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown } from 'lucide-react'

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
        <Card className="relative overflow-hidden mx-auto w-[21em] max-w-md bg-transparent border-0 hidden md:block h-full">
            {/* <div className="absolute bottom-0 left-0 z-0 w-full h-screen bg-white"></div> */}
            <CardHeader className="pt-0 pb-8">
                <CardTitle className="text-xl font-medium text-green-500">
                    Task Categories
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                    Explore your color-coded Planwise tasks
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 p-6">
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

function CategoryItem({ category, isOpen, onToggle, tasks }) {
    const contentRef = useRef(null)
    const [contentHeight, setContentHeight] = useState(undefined)

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight)
        }
    }, [isOpen])

    return (
        <div className="overflow-hidden bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div
                className="flex items-center p-4 space-x-4 cursor-pointer"
                onClick={onToggle}
            >
                <div
                    className="flex justify-center items-center w-12 h-12 rounded-full"
                    style={{ backgroundColor: category.color }}
                    aria-hidden="true"
                />
                <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{category.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                        {isOpen ? 'Click to close' : 'Click to view tasks'}
                    </p>
                </div>
                <div
                    className={`w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                >
                    <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
            </div>
            <div
                ref={contentRef}
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: isOpen ? contentHeight : 0 }}
            >
                <div className="px-4 pb-4">
                    {tasks.map((task) => (
                        <div key={task.id} className="p-2 mb-2 bg-gray-100 rounded dark:bg-gray-600">
                            <h4 className="font-medium text-gray-800 dark:text-white">{task.summary}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                {task.start} - {task.end}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
