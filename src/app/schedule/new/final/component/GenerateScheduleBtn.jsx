'use client'

import { generateAiSchedule } from '@/store/actions/schedule.actions'
import { Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export function GenerateScheduleBtn() {
  const multistepForm = useSelector(state => state.scheduleModule.multiStepForm)
  const router = useRouter()

  async function onGenerateAiSchedule() {
    router.replace('/schedule/ai/loading')
    const schedule = await generateAiSchedule(multistepForm)
    router.replace(`/schedule/ai/${schedule._id}`)
  }

  return (
    <button
      className="flex flex-row items-center px-2 md:px-5 py-3 rounded-lg font-medium w-[11em] transition-all duration-300 transform hover:scale-[1.02] bg-secondary hover:bg-secondary/80 text-white text-base md:text-lg shadow-md border border-secondary whitespace-nowrap"
      onClick={onGenerateAiSchedule}
    >
      <Sparkles className="hidden mr-2 w-6 h-6 md:block" />
      Generate Schedule
    </button>
  )
}
