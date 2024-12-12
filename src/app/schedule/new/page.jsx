'use client'

import { ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function ScheduleNew() {
  const [step, setStep] = useState([0])

  function pushStep(idx) {
    setStep([...step, idx])
  }

  const steps = ['Preferences', 'Goals', 'Routines']
  return (
    <div className="flex flex-col items-center justify-start mt-5 w-full h-[calc(100%-5em)] text-black bg-white shadow-sm rounded-lg">
      <ul className="flex flex-row items-center justify-between w-full gap-0 p-4">
        {steps.map((stepp, idx) => (
          <>
            <li onClick={() => pushStep(idx)} className={`${step[idx] ? 'text-blue-500' : ''}flex flex-row items-center text-sm gap-4`}>
              <span>{stepp}</span>
            </li>
              {idx !== 2 && <ChevronRight size={18}/>}
          </>
        ))}
      </ul>
    </div>
  )
}
