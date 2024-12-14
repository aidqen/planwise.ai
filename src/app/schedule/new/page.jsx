'use client'

import { ProgressBar } from '@/components/ProgressBar'
import TimePicker from '@/components/TimePicker'
import { ChevronRight, Clock } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Preferences } from './components/Preferences'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Goals } from './components/Goals'
import { AddGoals } from './components/AddGoals'

export default function ScheduleNew() {
  const [step, setStep] = useState(0)
  const router = useRouter()
  const searchParams = useSearchParams();
  const totalSteps = 3

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(searchParams.toString());
    currentSearchParams.set('step', step.toString()); // Add/update 'step' param
    router.push(`/schedule/new?${currentSearchParams.toString()}`, { shallow: true });
  }, [step, searchParams, router]);

  function goBackStep() {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  function goForwardStep() {
    setStep((prev) => prev + 1);
  };

  function renderStepContent() {
    switch (step) {
      case 0:
        return <Preferences />;
      case 1:
        return <AddGoals />;
      case 2:
        return <Routines />;
      case 3:
        return <Reviews />;
      default:
        return <div>Step not found</div>;
    }
  }

  return (
    <div className="relative flex flex-col items-start justify-start mt-5 w-full h-[calc(100%-5em)] text-black pt-10 rounded-xl ">
      <Breadcrumbs currentIdx={step} setStep={setStep}/>
      <div className="h-[1px] w-full bg-black/10"></div>
      {renderStepContent()}
      <div className="absolute bottom-0 left-0 w-full flex flex-row items-center justify-between py-10">
        <button
          onClick={goBackStep}
          className=
          "px-10 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] bg-white hover:bg-gray-50 text-gray-700 shadow-md border border-gray-200"
        >
          Back
        </button>
        <button
          onClick={goForwardStep}
          className=
          "px-8 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] bg-green-400 hover:bg-green-500 text-white shadow-md border border-green-300 whitespace-nowrap"
        >
          Save and Next
        </button>
      </div>
    </div >
  )
}
