'use client';

import { Clock } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useState, useEffect } from 'react';

export default function TimeInput({ 
    startHour = 0,
    endHour = 23,
    value,
    onChange,
    placeholder = "Select time",
    className = "",
    error,
    disabled = false,
}) {
    const [inputValue, setInputValue] = useState(value || '');

    useEffect(() => {
        setInputValue(value || '');
    }, [value]);

    const handleTimeChange = (e) => {
        const newTime = e.target.value;
        setInputValue(newTime);

        if (!newTime) {
            onChange('');
            return;
        }

        // Convert to 24h time format (HH:mm)
        const [hours, minutes] = newTime.split(':');
        const formattedTime = `${hours.padStart(2, '0')}:${minutes}`;

        // Validate time is within bounds
        const timeValue = parseInt(hours) * 60 + parseInt(minutes);
        const startValue = startHour * 60;
        const endValue = endHour * 60 + 59; // Allow up to XX:59

        if (timeValue >= startValue && timeValue <= endValue) {
            onChange(formattedTime);
        }
    };

    // Convert hours to padded strings for min/max
    const minTime = `${String(startHour).padStart(2, '0')}:00`;
    const maxTime = `${String(endHour).padStart(2, '0')}:59`;

    return (
        <div className="relative w-full">
            <div 
                className={cn(
                    "group flex items-center gap-2 px-3 py-2 w-full rounded-lg border transition-all duration-200",
                    "bg-white dark:bg-gray-800",
                    "border-gray-200 dark:border-gray-700",
                    "hover:bg-gray-50 dark:hover:bg-gray-700/50",
                    "focus-within:ring-2 focus-within:ring-green-500/20 dark:focus-within:ring-green-500/20",
                    error && "border-red-500 dark:border-red-500",
                    disabled && "opacity-50 cursor-not-allowed",
                    className
                )}
            >
                <input
                    type="time"
                    value={inputValue}
                    onChange={handleTimeChange}
                    min={minTime}
                    max={maxTime}
                    disabled={disabled}
                    className={cn(
                        "w-full text-sm transition-colors",
                        "bg-transparent outline-none",
                        "text-gray-900 dark:text-gray-100",
                        "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                        "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                        disabled && "cursor-not-allowed"
                    )}
                    placeholder={placeholder}
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
            {error && (
                <p className="mt-1 text-xs text-red-500 dark:text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}
