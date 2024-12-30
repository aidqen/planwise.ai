'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from '@/components/ui/section'

const loadingTexts = [
    "Considering your preferences...",
    "Adding your routines...",
    "Adding your goals...",
    "Optimizing your plan...",
    "Planning your meals...",
    "Almost ready..."
]

export default function Loading() {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prev) => (prev + 1) % loadingTexts.length)
        }, 3000) // Change text every 2 seconds

        return () => clearInterval(interval)
    }, [])

    return (
        <div
            className="flex fixed inset-0 justify-center items-center bg-gradient-to-br from-primary/5 via-background to-primary/5"
        >
            <motion.div
                initial={{ x: '-20%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }} className="flex relative flex-col gap-12 items-center p-8">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                    className="relative w-32 h-32"
                >
                    <Image
                        src="https://res.cloudinary.com/di6tqrg5y/image/upload/v1733918185/icon_1_ylom72.png"
                        alt="Planwise Logo"
                        fill
                        className="object-contain drop-shadow-lg"
                        priority
                    />
                </motion.div>

                {/* Loading Text */}
                <div className="overflow-hidden h-8">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={currentTextIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="text-lg font-medium text-center text-primary/80"
                        >
                            {loadingTexts[currentTextIndex]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* Loading Bar */}
                <div className="overflow-hidden relative w-64 h-1 rounded-full bg-muted">
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-primary"
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
            </motion.div>
        </div>
    )
}

