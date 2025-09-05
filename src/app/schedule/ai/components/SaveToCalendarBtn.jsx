import { Button } from "@/components/ui/button";
import { Calendar, CalendarIcon, Sparkles } from "lucide-react";
import { motion } from 'framer-motion'
import { useColorTransition, colors } from "@/hooks/useColorTransition";
import { useState } from "react";

export function SaveToCalendarBtn({ toggleCalendarDialog }) {
    return <>
        <div className="flex sticky bottom-10 z-50 justify-center items-center w-full">
            <motion.button
                onClick={toggleCalendarDialog}
                className="flex relative gap-2 items-center px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg group md:text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, type: 'spring' }}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-15"
                    style={{ filter: 'blur(5px)' }}
                />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl"
                />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r rounded-xl opacity-0 transition-opacity duration-300 from-blue-600/50 to-indigo-600/50 group-hover:opacity-100"
                />
                <motion.span className="flex relative gap-2 items-center">
                    <Calendar />
                    <span>Add to Calendar</span>
                </motion.span>
                <motion.div
                    className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-300 animate-tilt"
                    style={{ filter: 'blur(8px)' }}
                />
            </motion.button>
        </div>
    </>
}