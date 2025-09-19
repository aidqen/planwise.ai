'use client'

import { createSchedule, generateAiSchedule } from '@/store/actions/schedule.actions'
import { Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export function GenerateScheduleBtn() {
  const multistepForm = useSelector(state => state.scheduleModule.multiStepForm)
  const router = useRouter()

  async function onGenerateAiSchedule() {
    router.replace('/schedule/ai?new=false')
    // const schedule = await generateAiSchedule(multistepForm)
    const schedule = await createSchedule(multistepForm)
    console.log("🚀 ~ onGenerateAiSchedule ~ schedule:", schedule)
    router.replace(`/schedule/ai?id=${schedule._id}`)
  }

  return (
    <button
      className="flex flex-row items-center px-2 md:px-3 py-2.5 rounded-lg font-medium w-max transition-all duration-300 transform hover:scale-[1.02] bg-secondary hover:bg-secondary/80 text-white text-base md:text-lg shadow-md border border-secondary whitespace-nowrap"
      onClick={onGenerateAiSchedule}
    >
      <Sparkles className="hidden mr-2 md:block" size={20}/>
      Generate Schedule
    </button>
  )
}
