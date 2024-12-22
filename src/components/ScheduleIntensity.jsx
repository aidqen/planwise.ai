'use client'
import React from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Leaf, Clock, Zap } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_INTENSITY } from '@/store/reducers/schedule.reducer'

export function ScheduleIntensity({}) {
  const intensity = useSelector(
    state => state.scheduleModule.multiStepForm.preferences.intensity
  )
  const dispatch = useDispatch()
  const scheduleOptions = [
    {
      id: 'relaxed',
      value: 'relaxed',
      title: 'Relaxed Schedule',
      description: 'More breaks, spread out tasks',
      icon: <Leaf size={24} />,
      borderColor: 'border-[#B3E5FC]',
      bgColor: 'bg-[#E6F7FF]',
      textColor: 'text-[#29B6F6]',
      ringColor: '#29B6F6'
    },
    {
      id: 'moderate',
      value: 'moderate',
      title: 'Moderate Pace',
      description: 'Balanced breaks and tasks',
      icon: <Clock size={24} />,
      borderColor: 'border-yellow-200',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-500',
      ringColor: '#EAB308'
    },
    {
      id: 'intense',
      value: 'intense',
      title: 'Intense Schedule',
      description: 'Busy schedule, minimal breaks',
      icon: <Zap size={24} />,
      borderColor: 'border-[#FFCDD2]',
      bgColor: 'bg-[#FFEBEE]',
      textColor: 'text-[#E53935]',
      ringColor: '#E53935'
    },
  ]

  function handleIntensityChange(target) {
    dispatch({ type: SET_INTENSITY, intensity: target })
  }

  return (
    <div className="w-full max-w-md mx-auto pb-6 space-y-6">
      
      <RadioGroup
        value={intensity}
        onValueChange={handleIntensityChange}
        name="intensity"
        className="grid grid-cols-1 place-items-center gap-4 w-full"
      >
        {scheduleOptions.map(option => (
          <div
            key={option.id}
            style={{
              '--ring-color': option.ringColor
            }}
            className={`relative flex items-center p-4 rounded-xl border-2 w-[calc(100%-10px)] ${option.borderColor} ${
              intensity === option.value
                ? `${option.bgColor} ${option.borderColor} ${option.textColor} ring-2 ring-offset-2 ring-[--ring-color]`
                : `${option.bgColor} text-gray-300`
            } transition-all duration-200 `}
          >
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full ${option.textColor} `}
            >
              {option.icon}
            </div>

            <div className="ml-4 flex-grow">
              <Label htmlFor={option.id} className="flex flex-col cursor-pointer">
                <span className=" text-base text-gray-900">
                  {option.title}
                </span>
                <span className="text-xs text-black/50 mt-1">
                  {option.description}
                </span>
              </Label>
            </div>

            <RadioGroupItem value={option.value} id={option.id} className="mr-2 border-neutral/70" />
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
