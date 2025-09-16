"use client"

import { useMemo, useState } from "react"
import { AnimatePresence } from "framer-motion"
import MultiStepFormStepContent from "@/components/custom/multistepform/MultiStepFormStepContent"
import MultiStepFormNavigation from "@/components/custom/multistepform/MultiStepFormNavigation"
import { ProgressBar } from "../ProgressBar"
import { ModalBackgroundBlur } from "../ModalBackgroundBlur"
import { motion } from "framer-motion"
import useMeasure from "react-use-measure"

export function MultiStepForm() {
    const totalSteps = 5
    const [step, setStep] = useState<number>(1)
    const [direction, setDirection] = useState(1)
    const [ref, bounds] = useMeasure()

    const progress = useMemo(() => Math.min(100, Math.max(0, (step - 1) * 25)), [step])

    function nextStep() { setDirection(1); setStep(prev => Math.min(totalSteps, prev + 1)) }
    function prevStep() { setDirection(-1); setStep(prev => Math.max(1, prev - 1)) }

    const variants = {
        initial: (dir: number) => ({ opacity: 0, x: `${110 * dir}%` }),
        animate: { opacity: 1, x: 0 },
        exit: (dir: number) => ({ opacity: 0, x: `${-110 * dir}%` })
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <ModalBackgroundBlur />
            <div className="relative z-[150] bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                {/* Progress Bar */}
                <ProgressBar progress={progress} />
                <div className="py-8 px-12 relative z-[250]">
                    {/* <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Multi-Step Form
                    </h2> */}
                    <motion.div
                        initial={false}
                        animate={{ height: bounds.height }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
                        className="relative overflow-hidden"
                    >
                        <div ref={ref}>
                            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                                <motion.div
                                    key={step}
                                    variants={variants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    custom={direction}
                                    transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
                                    className="w-full"
                                >
                                    <MultiStepFormStepContent step={step} />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    <MultiStepFormNavigation
                        step={step}
                        totalSteps={totalSteps}
                        onPrev={prevStep}
                        onNext={nextStep}
                    />
                </div>
            </div>
        </div>
    );
}

export default MultiStepForm

