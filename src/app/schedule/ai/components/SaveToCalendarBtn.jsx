import { Button } from "@/components/ui/button";
import { CalendarIcon, Sparkles } from "lucide-react";
import { motion } from 'framer-motion'
import { useColorTransition, colors } from "@/hooks/useColorTransition";
import { useState } from "react";

export function SaveToCalendarBtn({ toggleCalendarDialog }) {
    const [isHovered, setIsHovered] = useState(false)
    const { colorSequence, duration } = useColorTransition()

    return <>
        <div className="flex sticky bottom-10 z-50 justify-center items-center w-full">
            <motion.button
                onClick={toggleCalendarDialog}
                className="overflow-hidden relative px-4 py-2 text-lg font-semibold text-white rounded-lg shadow-lg md:px-6 md:py-3"
                style={{
                    background: `linear-gradient(45deg, ${colorSequence})`,
                    backgroundSize: `${100 * colors.length}% 100%`,
                    animation: `moveGradient ${duration * colors.length}s linear infinite`,
                }}
                animate={{
                    boxShadow: isHovered
                        ? '0 10px 20px rgba(0, 0, 0, 0.2)'
                        : '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                transition={{ duration: 0.3 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <motion.span
                    className="flex relative z-10 items-center text-sm md:text-base"
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