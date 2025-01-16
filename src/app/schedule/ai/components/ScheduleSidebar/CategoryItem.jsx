import { ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function CategoryItem({ category, isOpen, onToggle, tasks }) {
    const contentRef = useRef(null)
    const [contentHeight, setContentHeight] = useState(null)

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight)
        }
    }, [isOpen])

    return (
        <div className="overflow-hidden mb-2">
            <div
                className="flex items-center px-3 py-2.5 space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors duration-200"
                onClick={onToggle}
            >
                <div
                    className="flex justify-center items-center w-7 h-7 rounded-lg"
                    style={{ backgroundColor: category.color }}
                    aria-hidden="true"
                />
                <div className="flex-grow">
                    <div className="flex items-center">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{category.name}</h3>
                    </div>
                </div>
                <div className='flex flex-row gap-5 justify-end'>
                    <span className="ml-2 px-2 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full">
                        {tasks?.length}
                    </span>
                    <div
                        className={`justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    >
                        <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    </div>
                </div>
            </div>
            <div
                ref={contentRef}
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: isOpen ? contentHeight : 0 }}
            >
                <div className="pl-[2.5rem] pr-3 py-1">
                    {tasks.map((task) => (
                        <div key={task.id} className="py-2 border-b border-gray-100 dark:border-gray-700/50 last:border-0">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{task.summary}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {task.start} - {task.end}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
