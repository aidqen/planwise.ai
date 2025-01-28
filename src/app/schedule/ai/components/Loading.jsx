import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const loadingTexts = [
    "Considering preferences...",
    "Adding your routines...",
    "Adding your goals...",
    "Optimizing your plan...",
    "Planning your meals...",
    "Almost ready..."
]

export function Loading() {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prev) => (prev + 1) % loadingTexts.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    return <div className="flex items-center justify-center min-h-[80vh]">
        <motion.div
            className="space-y-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative">
                <motion.div
                    className="mx-auto w-16 h-16"
                    animate={{
                        rotate: 360,
                        borderRadius: ["25%", "50%", "25%"]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div className="w-full h-full bg-gradient-to-tr from-blue-500 to-purple-500 rounded-lg dark:from-blue-600 dark:to-purple-600" />
                </motion.div>
                <motion.div
                    className="absolute inset-0 mx-auto w-16 h-16"
                    initial={{ opacity: 0.5, scale: 1 }}
                    animate={{
                        opacity: 0,
                        scale: 1.5,
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeOut"
                    }}
                >
                    <div className="w-full h-full rounded-lg bg-blue-500/20 dark:bg-blue-500/30" />
                </motion.div>
            </div>

            <div className="space-y-4">
                <div className="overflow-hidden h-8">
                    <AnimatePresence mode="wait">
                        <motion.h3
                            key={currentTextIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="text-xl font-medium text-gray-800 dark:text-gray-200"
                        >
                            {loadingTexts[currentTextIndex]}
                        </motion.h3>
                    </AnimatePresence>
                </div>

                <div className="overflow-hidden relative h-1 bg-gray-200 rounded-full min-w-64 max-w-64 dark:bg-gray-700">
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-blue-500 dark:bg-blue-600"
                        initial={{ width: "0%" }}
                        animate={{
                            width: ["0%", "100%"],
                            x: ["0%", "0%", "100%"]
                        }}
                        transition={{
                            duration: 2,
                            ease: "easeInOut",
                            repeat: Infinity,
                            times: [0, 0.5, 1]
                        }}
                    />
                </div>
            </div>
        </motion.div>
    </div>
}