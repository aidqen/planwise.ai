'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { Preferences } from './components/Preferences'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { AddGoals } from './components/AddGoals'
import { Routines } from './components/Routines'
import { ConfettiButton } from '@/components/ui/confetti-button'
import { useSelector } from 'react-redux'

export default function SuspenseContainer() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScheduleNew />
    </Suspense>
  )
}

export function ScheduleNew() {
  const [step, setStep] = useState(0)
  const multiStepForm = useSelector(state => state.scheduleModule.multiStepForm)
  console.log('multiStepForm:', multiStepForm)

  const router = useRouter()
  const searchParams = useSearchParams()
  const totalSteps = 3

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(searchParams.toString())
    currentSearchParams.set('step', step.toString()) // Add/update 'step' param
    router.push(`/schedule/new?${currentSearchParams.toString()}`, { shallow: true })
  }, [step, searchParams, router])

  function goBackStep() {
    setStep(prev => Math.max(prev - 1, 0))
  }

  function goForwardStep() {
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
      default:
        router.push('/schedule/new/final')
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-between max-sm:mt-5 mt-2 max-sm:w-full w-[40%]  h-[calc(100%-5em)] text-black pt-10 rounded-xl ">
      <div className="w-full max-sm:block flex flex-col items-center">
        <Breadcrumbs currentIdx={step} setStep={setStep} />
        <div className="h-[1px] w-full bg-black/10"></div>
        {renderStepContent()}
      </div>
      <div className="fixed bottom-0 left-0 py-10 px-5 max-sm:w-full w-[20em] flex flex-row items-center justify-between pt-7">
        <button
          onClick={goBackStep}
          className="px-10 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] bg-white hover:bg-gray-50 text-gray-700 shadow-md border border-gray-200"
        >
          Back
        </button>
        {step === 2 ? (
          <ConfettiButton>
            <button
              onClick={goForwardStep}
              className="px-8 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] bg-secondary hover:bg-secondary/80 text-white shadow-md border border-secondary whitespace-nowrap"
            >
              Complete
            </button>
          </ConfettiButton>
        ) : (
          <button
            onClick={goForwardStep}
            className="px-8 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] bg-green-400 hover:bg-green-500 text-white shadow-md border border-green-300 whitespace-nowrap"
          >
            Save and Next
          </button>
        )}
      </div>
    </div>
  )
}
