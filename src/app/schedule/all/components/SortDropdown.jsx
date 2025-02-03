'use client'

import { 
    Calendar, 
    ChevronDown, 
    ArrowUp, 
    ArrowDown,
    ListFilter,
    Gauge,
    AlarmClock
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

const sortingOptions = [
    { id: 'date', label: 'Date', icon: Calendar },
    { id: 'name', label: 'Name', icon: ListFilter },
    { id: 'intensity', label: 'Intensity', icon: Gauge },
    { id: 'wakeup', label: 'Wake Up Time', icon: AlarmClock }
];

export function SortDropdown({ sortConfig, onSortChange }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="ghost" 
                    className="flex gap-2 items-center px-0 h-8 text-sm font-normal text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-transparent"
                >
                    {sortConfig.direction === 'desc' ? 
                        <ArrowDown className="w-3.5 h-3.5" /> : 
                        <ArrowUp className="w-3.5 h-3.5" />
                    }
                    <span>{sortingOptions.find(opt => opt.id === sortConfig.field)?.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 ml-0.5 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                align="end" 
                className="w-48 border border-gray-200 shadow-lg backdrop-blur-sm bg-white/95 dark:bg-gray-950/95 dark:border-gray-800"
            >
                {sortingOptions.map((option) => (
                    <DropdownMenuItem
                        key={option.id}
                        onClick={() => {
                            onSortChange(prev => ({
                                field: option.id,
                                direction: prev.field === option.id 
                                    ? (prev.direction === 'desc' ? 'asc' : 'desc')
                                    : 'desc'
                            }));
                        }}
                        className={cn(
                            "flex items-center justify-between py-2",
                            "text-gray-700 dark:text-gray-300",
                            "hover:bg-gray-50 dark:hover:bg-gray-900/50",
                            "focus:bg-gray-50 dark:focus:bg-gray-900/50",
                            "active:bg-gray-100 dark:active:bg-gray-800/50",
                            sortConfig.field === option.id && "bg-gray-50 dark:bg-gray-900/50"
                        )}
                    >
                        <span className="flex items-center gap-2.5">
                            <option.icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            {option.label}
                        </span>
                        {sortConfig.field === option.id && (
                            sortConfig.direction === 'desc' 
                                ? <ArrowDown className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                                : <ArrowUp className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
