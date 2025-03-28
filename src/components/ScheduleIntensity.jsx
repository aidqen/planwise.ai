'use client'
import React, { useEffect, useRef } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Leaf, Clock, Zap } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_INTENSITY } from '@/store/reducers/schedule.reducer'

export function ScheduleIntensity() {
  const intensity = useSelector(
    state => state.scheduleModule.multiStepForm.preferences.intensity
  )
  const userPreferences = useSelector(state => state.userModule.user?.preferences)
  const dispatch = useDispatch()
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current && userPreferences?.intensity && !intensity) {
      initialized.current = true
      dispatch({ type: SET_INTENSITY, intensity: userPreferences.intensity })
    }
  }, [userPreferences, intensity, dispatch])

  const scheduleOptions = [
    {
      id: 'relaxed',
      value: 'relaxed',
      title: 'Relaxed Schedule',
      description: 'More breaks, spread out tasks',
      icon: <Leaf size={24} />,
      borderColor: 'border-[#B3E5FC] dark:border-blue-500/30',
      bgColor: 'bg-[#E6F7FF] dark:bg-blue-500/10',
      textColor: 'text-[#29B6F6] dark:text-blue-400',
      ringColor: '#29B6F6'
    },
    {
      id: 'moderate',
      value: 'moderate',
      title: 'Moderate Pace',
      description: 'Balanced breaks and tasks',
      icon: <Clock size={24} />,
      borderColor: 'border-yellow-200 dark:border-yellow-500/30',
      bgColor: 'bg-yellow-50 dark:bg-yellow-500/10',
      textColor: 'text-yellow-500 dark:text-yellow-400',
      ringColor: '#EAB308'
    },
    {
      id: 'intense',
      value: 'intense',
      title: 'Intense Schedule',
      description: 'Busy schedule, minimal breaks',
      icon: <Zap size={24} />,
      borderColor: 'border-[#FFCDD2] dark:border-red-500/30',
      bgColor: 'bg-[#FFEBEE] dark:bg-red-500/10',
      textColor: 'text-[#E53935] dark:text-red-400',
      ringColor: '#E53935'
    },
  ]

  function handleIntensityChange(target) {
    dispatch({ type: SET_INTENSITY, intensity: target })
  }

  return (
    <div className="pb-6 space-y-6 w-full">
      <RadioGroup
        value={intensity}
        onValueChange={handleIntensityChange}
        name="intensity"
        className="grid grid-cols-1 gap-4 place-items-center w-full"
      >
        {scheduleOptions.map(option => (
          <div
            key={option.id}
            style={{
              '--ring-color': option.ringColor
            }}
            className={`relative flex items-center px-4 py-3 max-sm:py-2 max-sm:px-2 rounded-xl border-2 w-full ${option.borderColor} ${
              intensity === option.value
                ? `${option.bgColor} ${option.borderColor} ${option.textColor} ring-2 ring-offset-2 dark:ring-offset-gray-900 ring-[--ring-color]`
                : `${option.bgColor} dark:bg-gray-800/50 text-gray-300 dark:text-gray-400`
            } transition-all duration-200`}
          >
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full ${option.textColor}`}
            >
              {option.icon}
            </div>

            <div className="flex-grow ml-4">
              <Label htmlFor={option.id} className="flex flex-col cursor-pointer">
                <span className="text-base text-gray-900 dark:text-gray-100">
                  {option.title}
                </span>
                <span className="mt-1 text-xs text-black/50 dark:text-gray-400">
                  {option.description}
                </span>
              </Label>
            </div>

            <RadioGroupItem value={option.value} id={option.id} className="mr-2 border-neutral/70 dark:border-gray-600" />
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
