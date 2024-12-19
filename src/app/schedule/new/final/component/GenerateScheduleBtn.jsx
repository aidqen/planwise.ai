'use client'

import { generateAiSchedule } from '@/store/actions/schedule.actions'
import { Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

export function GenerateScheduleBtn() {
  const multistepForm = useSelector(state => state.scheduleModule.multistepForm)
  const router = useRouter()

  async function onGenerateAiSchedule() {
    await generateAiSchedule(multistepForm)
    router.push('/schedule/ai')
  }

  return (
    <button
      className="flex flex-row items-center px-5 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] bg-secondary hover:bg-secondary/80 text-white text-lg shadow-md border border-secondary whitespace-nowrap"
      onClick={onGenerateAiSchedule}
    >
      <Sparkles className="h-6 w-6 mr-2" />
      Generate AI schedule
    </button>
  )
}
