'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { Preferences } from './components/Preferences'
import { AddGoals } from './components/AddGoals'
import { Routines } from './components/Routines'
import { ConfettiButton } from '@/components/ui/confetti-button'
import { StepsBreadcrumbs } from './components/StepsBreadcrumbs'
import { CalendarSync, Goal, SquareChartGantt, UserRoundPen } from 'lucide-react'
import ReviewStep from './components/ReviewStep'
import { GenerateScheduleBtn } from './components/GenerateScheduleBtn'


function ScheduleNewContent() {
  const [step, setStep] = useState(0) // Default value, will update below

  // const multiStepForm = useSelector(state => state.scheduleModule.multiStepForm)

  const router = useRouter()
  const searchParams = useSearchParams()
  const totalSteps = 3
  const steps = [
    { id: 1, name: 'Preferences', href: '#', logo: UserRoundPen },
    { id: 2, name: 'Goals', href: '#', logo: Goal },
    { id: 3, name: 'Routines', href: '#', logo: CalendarSync },
    { id: 4, name: 'Review', href: '#', logo: SquareChartGantt },
  ]

  useEffect(() => {
    // Parse the step value from the query params
    const stepFromQuery = parseInt(searchParams.get('step'), 10)

    // Update step state only if stepFromQuery is valid
    if (!isNaN(stepFromQuery) && stepFromQuery >= 0 && stepFromQuery < totalSteps) {
      setStep(stepFromQuery)
    }
  }, [searchParams])

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(searchParams.toString())
    currentSearchParams.set('step', step.toString()) // Add/update 'step' param
    router.push(`/schedule/new?${currentSearchParams.toString()}`, { shallow: true })
  }, [step, searchParams, router])

  function goBackStep() {
    setStep(prev => Math.max(prev - 1, 0))
  }

  function goForwardStep() {
    if (step === steps.length - 1) return router.push('/schedule/new/final')
    setStep(prev => prev + 1)
  }

  function renderStepContent() {
    switch (step) {
      case 0:
        return <Preferences />
      case 1:
        return <AddGoals />
      case 2:
        return <Routines />
      case 3:
        return <ReviewStep />
    }
  }

  return (

    <div className="scrollbar-hidden px-6 pt-7 scroll-smooth flex overflow-y-auto overflow-x-hidden relative flex-col justify-between md:pt-16 items-center sm:px-5 md:px-6  sm:w-[65%] md-[60%] xl:w-[50%] 2xl:w-[45%] h-full text-black rounded-xl w-full">
      <div className="flex flex-col items-center pt-1 w-full max-sm:block">
        <StepsBreadcrumbs currentStep={step + 1} steps={steps} setStep={setStep} />
        {renderStepContent()}
      </div>
      <div className="flex flex-row gap-20 justify-center items-center py-4 pt-7 w-full md:py-3 btns max-sm:justify-center max-sm:gap-5">
        {step > 0 && <button
          onClick={goBackStep}
          className="px-10 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-md dark:shadow-gray-900/30 border border-gray-200 dark:border-gray-700"
        >
          Back
        </button>}
        {step === steps.length - 1 ? (
          <ConfettiButton>
            <GenerateScheduleBtn />
          </ConfettiButton>
        ) : (
          <button
            onClick={goForwardStep}
            className="px-8 py-2.5 rounded-lg font-medium transition-all w-[11em] duration-300 transform hover:scale-[1.02] bg-green-400 dark:bg-green-500 hover:bg-green-500 dark:hover:bg-green-600 text-white shadow-md dark:shadow-gray-900/30 border border-green-300 dark:border-green-600 whitespace-nowrap"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}

export default function ScheduleNew() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScheduleNewContent />
    </Suspense>
  )
}