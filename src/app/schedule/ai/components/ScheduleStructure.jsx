'use client'

import { format } from 'date-fns';
import { motion } from 'framer-motion';

export function ScheduleStructure({ wakeupMinutes }) {
    const isCurrentHour = (hour) => {
        const currentHour = new Date().getHours();
        return currentHour === hour;
    };

    return (
        <div className=" inset-0 pointer-events-none">
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
                            absolute -left-14 w-12 text-right md:-left-16 
                            font-medium transition-all duration-200
                            ${current ? 'text-blue-600 scale-110' : 'text-gray-500 group-hover:text-gray-800'}
                        `}>
                            <span className="text-sm">
                                {format(new Date().setHours(hour, 0, 0, 0), 'h a')}
                            </span>
                        </div>
                        <div className="relative h-full">
                            <div className={`
                                h-[1px] w-full transition-all duration-200
                                ${current 
                                    ? 'bg-blue-200' 
                                    : 'bg-gray-200 group-hover:bg-gray-300'
                                }
                            `} />
                            {current && (
                                <motion.div 
                                    className="absolute left-0 w-2 h-2 -mt-1 bg-blue-500 rounded-full"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        duration: 0.5,
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 10
                                    }}
                                />
                            )}
                            <div className={`
                                absolute left-0 h-8 -mt-4 w-full opacity-0 
                                group-hover:opacity-100 transition-opacity duration-200
                                bg-gradient-to-r from-gray-50/50 to-transparent
                            `} />
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}