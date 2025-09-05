'use client'

import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Current time indicator component
function CurrentTimeIndicator({ position }) {
    return (
        <motion.div 
            className="absolute left-0 w-full z-0 pointer-events-none"
            style={{ top: `${position}px` }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="flex items-center">
                <motion.div 
                    className="absolute -left-[9.5px] flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200,
                        damping: 10
                    }}
                >
                    <div className="w-3.5 h-3.5 bg-blue-500 dark:bg-blue-700 rounded-full" />
                    <div className="absolute w-5 h-5 bg-blue-400/30 dark:bg-blue-400/20 rounded-full animate-ping" 
                        style={{ animationDuration: '3s' }} />
                </motion.div>
                <div className="w-full h-[1.5px] bg-blue-500 dark:bg-blue-700" />
            </div>
        </motion.div>
    );
}

export function ScheduleStructure({ wakeupMinutes }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    
    // Update current time every minute
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        
        return () => clearInterval(interval);
    }, []);
    
    const isCurrentHour = (hour) => {
        const currentHour = currentTime.getHours();
        return currentHour === hour;
    };
    
    // Calculate the exact position for the current time indicator
    const getCurrentTimePosition = () => {
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const totalMinutes = hours * 60 + minutes;
        
        // Calculate wakeup hour from wakeupMinutes
        const wakeupHour = Math.floor(wakeupMinutes / 60);
        const wakeupTotalMinutes = wakeupHour * 60;
        
        // Calculate minutes since wakeup
        const minutesSinceWakeup = totalMinutes - wakeupTotalMinutes;
        
        // Calculate position based on minutes since wakeup
        // Each hour is 68.33px in height
        return (minutesSinceWakeup / 60) * 68.33;
    };

    return (
        <div className="inset-0 pointer-events-none">
            {Array.from({ length: 24 }).map((_, index) => {
                const hour = Math.floor((wakeupMinutes + index * 60) / 60) % 24;
                const current = isCurrentHour(hour);
                
                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                            delay: index * 0.03,
                            duration: 0.5,
                            ease: "easeOut"
                        }}
                        className="absolute left-0 w-full group pointer-events-auto"
                        style={{ top: `${(index * 68.33)}px`, height: '68.33px' }}
                    >
                        <div className={`
                            absolute -left-14 w-14 text-right md:-left-16 
                            font-medium transition-all duration-300
                            ${current 
                                ? 'text-blue-600 dark:text-blue-400 scale-110 translate-x-1' 
                                : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200'}
                        `}>
                            <span className={`
                                absolute -left-0 -top-2.5 text-sm rounded-full px-2 py-0.5 transition-all duration-300
                                ${current 
                                    ? 'bg-blue-100 dark:bg-blue-900/40' 
                                    : 'group-hover:bg-gray-100 dark:group-hover:bg-gray-800/40'}
                            `}>
                                {format(new Date().setHours(hour, 0, 0, 0), 'h a')}
                            </span>
                        </div>
                        <div className="relative h-full">
                            <div className={`
                                h-[1px] w-full transition-all duration-300 bg-gray-200 dark:bg-gray-700 group-hover:bg-gray-300 dark:group-hover:bg-gray-600
                               
                            `} 
                            />
                            <div className={`
                                absolute left-0 h-12 -mt-6 w-full opacity-0 
                                group-hover:opacity-100 transition-opacity duration-300
                                bg-gradient-to-r from-gray-50/60 dark:from-gray-900/60 to-transparent
                            `} />
                        </div>
                    </motion.div>
                );
            })}
            
            {/* Render the current time indicator component */}
            <CurrentTimeIndicator position={getCurrentTimePosition()} />
        </div>
    );
}