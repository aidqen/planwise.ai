'use client';

import { Clock } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function TimePicker({ 
    startHour = 0,
    endHour = 23,
    value,
    onChange,
    icon: Icon = Clock,
    placeholder,
    className = ""
}) {
    function generateTimeSlots(startHour, endHour) {
        const slots = [];
        const totalHours = endHour < startHour ? 24 + endHour - startHour : endHour - startHour + 1;
    
        for (let i = 0; i < totalHours; i++) {
            const currentHour = (startHour + i) % 24;
            const hour = String(currentHour).padStart(2, '0');
    
            // Add slots for :00, :15, :30, and :45
            const minutes = ["00", "15", "30", "45"];
            minutes.forEach(minute => {
                const timeString = `${hour}:${minute}`;
                slots.push({
                    id: timeString,
                    label: timeString
                });
            });
        }
    
        return slots;
    }

    const timeSlots = generateTimeSlots(startHour, endHour)

    return (
        <Select onValueChange={onChange}>
            <SelectTrigger 
                className={`inline-flex justify-start items-center px-2 py-2 w-full text-xs text-gray-700 bg-white rounded-lg border border-gray-200 shadow-sm transition-all duration-200 sm:px-3 md:px-5 sm:text-sm dark:bg-gray-800 dark:border-gray-700 me-2 dark:text-gray-200 focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-500/20 ${className}`}
            >
                <Icon className="mr-1.5 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
                <SelectValue placeholder={value ? value : placeholder} className="truncate">{value}</SelectValue>
            </SelectTrigger>
            <SelectContent className="max-h-[40vh] w-[var(--radix-select-trigger-width)] overflow-auto overflow-x-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                <SelectGroup>
                    {timeSlots.map((slot) => (
                        <SelectItem
                            key={slot.id}
                            value={slot.id}
                            className="text-xs sm:text-sm text-gray-700 cursor-pointer dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:bg-gray-50 dark:focus:bg-gray-700/50 py-1.5 sm:py-2"
                        >
                            {slot.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}