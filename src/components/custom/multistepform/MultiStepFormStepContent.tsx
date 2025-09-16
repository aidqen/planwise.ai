"use client"

import { Preferences } from "@/app/schedule/new/components/Preferences"
import { AddGoals } from "@/app/schedule/new/components/AddGoals"
import { Routines } from "@/app/schedule/new/components/Routines"
import ReviewStep from "@/app/schedule/new/components/ReviewStep"
import GoogleCalendarFetchStep from "@/components/GoogleCalendarFetchStep"
import { motion } from "framer-motion"

export function MultiStepFormStepContent({ step }: { step: number }) {
    return (
        <>
            {step === 1 && (
                <Preferences />
            )}
            {step === 2 && (
                <AddGoals />
            )}
            {step === 3 && (
                <Routines />
            )}
            {step === 4 && (
                <GoogleCalendarFetchStep />
            )}
            {step === 5 && (
                <ReviewStep />
            )}
        </>

    )
}

export default MultiStepFormStepContent

