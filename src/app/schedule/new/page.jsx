'use client'

import { ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function ScheduleNew() {
  const [currentStep, setCurrentStep] = useState([0])
  const [formData, setFormData] = useState({});
  
  function nextStep() {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  }

  function prevStep() {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  }

  function handleSubmit() {
    console.log("Form submitted:", formData);
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const steps = ['Preferences', 'Goals', 'Routines']
  return (
    <div className="flex flex-col w-full h-full items-start justify-start">
      <ProgressBar currentStep={step.length} totalSteps={steps} />
    </div>
  )
}
