import { Button } from "@/components/ui/button";
import { CalendarIcon, Sparkles } from "lucide-react";
import { motion } from 'framer-motion'
import { useColorTransition, colors } from "@/hooks/useColorTransition";
import { useState } from "react";

export function SaveToCalendarBtn({ toggleCalendarDialog, isVisible }) {
    const [isHovered, setIsHovered] = useState(false)
    const { colorSequence, duration } = useColorTransition()

    return <>
        <div className=" max-sm:flex fixed right-0 left-0 bottom-6 z-50 justify-center hidden">
            <motion.button
                onClick={toggleCalendarDialog}
                className="relative overflow-hidden px-6 py-4 rounded-[15px] text-white font-semibold text-lg shadow-lg"
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
                    className="relative z-10 flex items-center"
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

        <div className="md:flex hidden justify-center items-center sticky bottom-10 z-50 w-full">
            <motion.button
                onClick={toggleCalendarDialog}
                className="relative overflow-hidden px-6 py-4 rounded-[15px] text-white font-semibold text-lg shadow-lg"
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
                    className="relative z-10 flex items-center"
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