'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export function CollapsibleSection({ title, icon: Icon, isOpen, onToggle, children, iconColor, length }) {
    const contentRef = useRef(null)
    const [contentHeight, setContentHeight] = useState(null)

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight)
        }
    }, [isOpen])

    return (
        <div className="overflow-hidden bg-white rounded-lg">
            <div
                className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50"
                onClick={onToggle}
            >
                <div className="flex gap-2 items-center">
                    <div className="flex justify-center items-center w-7 h-7 rounded-lg" style={{ backgroundColor: iconColor }}>
                        <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{title}</span>
                </div>
                <div className='flex flex-row gap-5 justify-end'>
                    {length && <span className="ml-2 px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                        {length}
                    </span>}
                    <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>

                        <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </div>
            <div
                ref={contentRef}
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: isOpen ? contentHeight : 0 }}
            >
                <div className="p-3 pt-0">
                    {children}
                </div>
            </div>
        </div>
    )
}
