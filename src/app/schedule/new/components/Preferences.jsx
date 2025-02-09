'use client'
import { ScheduleIntensity } from '@/components/ScheduleIntensity'
import TimePicker from '@/components/TimePicker'
import { Section } from '@/components/ui/section'
import { SET_SLEEP, SET_WAKEUP } from '@/store/reducers/schedule.reducer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'

export function Preferences() {
  const timeTypes = ['Wake Up', 'Sleep']
  const dispatch = useDispatch()
  const userPreferences = useSelector((state) => state.userModule.user?.preferences)
  const preferences = useSelector(
    (state) => state.scheduleModule.multiStepForm.preferences
  )
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current && userPreferences) {
      initialized.current = true
      
      if (!preferences.wakeup && userPreferences.wakeup) {
        dispatch({ type: SET_WAKEUP, wakeup: userPreferences.wakeup })
      }
      if (!preferences.sleep && userPreferences.sleep) {
        dispatch({ type: SET_SLEEP, sleep: userPreferences.sleep })
      }
    }
  }, [userPreferences, preferences.wakeup, preferences.sleep, dispatch])

  return (
    <Section className="w-full">
      <div className="flex flex-col gap-8 items-center py-8 pt-10 w-full h-full md:p-8 max-sm:items-start">
        <div className="space-y-2 w-full text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 md:text-2xl">
            Daily Schedule Preferences
          </h2>
          <p className="mx-auto max-w-lg text-sm text-gray-600 dark:text-gray-400 md:text-base max-sm:mx-0">
            Set your daily preferences to help us generate a schedule which fits you.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 w-full max-w-xl">
          {timeTypes.map(timeType => {
            const isWakeUp = timeType === 'Wake Up'
            const value = isWakeUp ? preferences.wakeup : preferences.sleep
            const handleChange = (newValue) => {
              if (isWakeUp) {
                dispatch({ type: SET_WAKEUP, wakeup: newValue })
              } else {
                dispatch({ type: SET_SLEEP, sleep: newValue })
              }
            }

            return (
              <div
                key={timeType}
                className="flex flex-col gap-2 justify-start items-start"
              >
                <label className="text-base font-normal max-sm:text-sm text-black/80 dark:text-white/80">{timeType}</label>
                <TimePicker
                  startHour={isWakeUp ? 4 : 19}
                  endHour={isWakeUp ? 13 : 4}
                  value={value}
                  onChange={handleChange}
                  placeholder={value}
                />
              </div>
            )
          })}
        </div>

        <div className="pt-4 w-full max-w-xl">
          <ScheduleIntensity />
        </div>
      </div>
    </Section>
  )
}
