import { ScheduleIntensity } from '@/components/ScheduleIntensity'
import TimePicker from '@/components/TimePicker'
import { Section } from '@/components/ui/section'
import { SAVE_PREFERENCES } from '@/store/reducers/schedule.reducer'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function Preferences({ }) {
  // const [preferences, setPreferences] = useState({
  //   wakeup: '7:00 AM',
  //   sleep: '10:00 PM',
  //   intensity: 'relaxed',
  // })

  const timeTypes = ['Wake Up', 'Sleep']

  return (
    <Section>
      <div className="flex flex-col max-sm:items-start items-center gap-7 w-full h-full mt-7">
      <h3 className="text-xl font-medium text-gray-900 text-center w-full">
        How's your day looking?
      </h3>
        <div className="flex flex-row justify-between items-center max-sm:w-full w-[30em] mb-3">
          {timeTypes.map(timeType => (
            <div
              key={timeType}
              className="flex flex-col items-start justify-start gap-2"
            >
              <label className="font-normal max-sm:text-sm text-base text-black/80">{timeType}</label>
              <TimePicker
                timeType={timeType}
              />
            </div>
          ))}
        </div>
        <ScheduleIntensity
        />
      </div>
    </Section>
  )
}
