"use client"

import { ConfettiButton } from "@/components/ui/confetti-button"
import { GenerateScheduleBtn } from "@/app/schedule/new/components/GenerateScheduleBtn"

type Props = {
    step: number
    totalSteps: number
    onPrev: () => void
    onNext: () => void
}

export default function MultiStepFormNavigation({ step, totalSteps, onPrev, onNext }: Props) {
    return (
        <div className="mt-5 flex items-center justify-between relative z-[2147483647]">
            <button
                type="button"
                onClick={onPrev}
                disabled={step === 1}
                className="px-6 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Back
            </button>
            {step === totalSteps ? (
                <ConfettiButton>
                    <GenerateScheduleBtn />
                </ConfettiButton>
            ) : (
                <button
                    type="button"
                    onClick={onNext}
                    className="px-6 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                >
                    Next
                </button>
            )}
        </div>
    )
}


