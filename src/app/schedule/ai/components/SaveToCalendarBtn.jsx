import { Button } from "@/components/ui/button";
import { CalendarIcon, Sparkles } from "lucide-react";
import { motion } from 'framer-motion'
import { useColorTransition, colors } from "@/hooks/useColorTransition";
import { useState } from "react";

export function SaveToCalendarBtn({ toggleCalendarDialog }) {
    const [isHovered, setIsHovered] = useState(false)
    const { colorSequence, duration } = useColorTransition()

    return <>
        <div className="flex justify-center items-center sticky bottom-10 z-50 w-full">
            <motion.button
                onClick={toggleCalendarDialog}
                className="relative overflow-hidden md:px-6 md:py-3 px-4 py-2 rounded-lg text-white font-semibold text-lg shadow-lg"
                style={{
                    background: `linear-gradient(45deg, ${colorSequence})`,
                    backgroundSize: `${100 * colors.length}% 100%`,
                    animation: `moveGradient ${duration * colors.length}s linear infinite`,
                }}
                animate={{
                    scale: isHovered ? 1.05 : 1,
                    boxShadow: isHovered
                        ? '0 10px 20px rgba(0, 0, 0, 0.2)'
                        : '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                transition={{ duration: 0.3 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <motion.span
                    className="relative z-10 md:text-base text-sm flex items-center"
                    animate={{ y: isHovered ? -2 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <Sparkles className="mr-2 w-6 h-6" />
                    Add To Calendar
                </motion.span>
                <motion.div
                    className="absolute inset-0 opacity-0"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                    }}
                    animate={{ opacity: isHovered ? 0.6 : 0 }}
                    transition={{ duration: 0.3 }}
                />
            </motion.button>
        </div>
    </>
}