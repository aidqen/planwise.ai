'use client'

import { useState } from 'react'
import { CategoryItem } from './CategoryItem'

const categories = [
    {
        id: 'break',
        name: 'Breaks',
        color: '#3b82f6',
    },
    {
        id: 'goal',
        name: 'Goal Tasks',
        color: '#06b6d4',
    },
    {
        id: 'routine',
        name: 'Routine Tasks',
        color: '#0284c7',
    },
    {
        id: 'meal',
        name: 'Meals',
        color: '#22c55e',
    },
]

export function CategoryDropdown({ schedule }) {
    const [openCategory, setOpenCategory] = useState(null)

    const toggleCategory = (categoryName) => {
        setOpenCategory(openCategory === categoryName ? null : categoryName)
    }

    return (
        <div>
            <h3 className="mb-4 text-sm font-medium text-gray-600 dark:text-gray-400">Task Categories</h3>
            <div className="space-y-4">
                {categories.map((category) => (
                    <CategoryItem
                        key={category.name}
                        category={category}
                        isOpen={openCategory === category.name}
                        tasks={schedule?.schedule?.filter((task) => task.category === category.id)}
                        onToggle={() => toggleCategory(category.name)}
                    />
                ))}
            </div>
        </div>
    )
}
