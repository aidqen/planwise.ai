'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { Preferences } from './components/Preferences'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { AddGoals } from './components/AddGoals'
import { Routines } from './components/Routines'
import { ConfettiButton } from '@/components/ui/confetti-button'
import { useSelector } from 'react-redux'

function ScheduleNewContent() {
  const [step, setStep] = useState(0) // Default value, will update below

  const multiStepForm = useSelector(state => state.scheduleModule.multiStepForm)
  console.log('multiStepForm:', multiStepForm)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const totalSteps = 3
  
  useEffect(() => {
    // Parse the step value from the query params
    const stepFromQuery = parseInt(searchParams.get('step'), 10)
    console.log('searchParams.get(step):', searchParams.get('step'))
    
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
    if (step === 2) return router.push('/schedule/new/final')
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
    }
  }

  return (
      <div className="relative flex flex-col items-center justify-between max-sm:w-full px-6 w-full h-[calc(100%-5em)] overflow-x-hidden overflow-y-auto text-black pt-5 rounded-xl pb-20">
        <div className="w-full max-sm:block flex flex-col items-center">
          <Breadcrumbs currentIdx={step} setStep={setStep} />
          {/* <div className="h-[1px] w-full bg-black/10"></div> */}
          {renderStepContent()}
        </div>
        <div className="btns fixed bottom-0 left-0 py-10 w-full flex flex-row items-center max-sm:justify-center max-sm:gap-5 justify-center gap-20 pt-7">
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
                className="px-8 py-2.5 rounded-lg font-medium transition-all w-[11em] duration-300 transform hover:scale-[1.02] bg-secondary hover:bg-secondary/80 text-white shadow-md border border-secondary whitespace-nowrap"
              >
                Complete
              </button>
            </ConfettiButton>
          ) : (
            <button
              onClick={goForwardStep}
              className="px-8 py-2.5 rounded-lg font-medium transition-all w-[11em] duration-300 transform hover:scale-[1.02] bg-green-400 hover:bg-green-500 text-white shadow-md border border-green-300 whitespace-nowrap"
            >
              Save and Next
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