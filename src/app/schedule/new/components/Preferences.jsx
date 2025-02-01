'use client'
import { ScheduleIntensity } from '@/components/ScheduleIntensity'
import TimePicker from '@/components/TimePicker'
import { Section } from '@/components/ui/section'
import { SET_SLEEP, SET_WAKEUP } from '@/store/reducers/schedule.reducer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export function Preferences() {
  const timeTypes = ['Wake Up', 'Sleep']
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userModule.user)
  const preferences = useSelector(
    (state) => state.scheduleModule.multiStepForm.preferences
  )

  useEffect(() => {
    // Set default values from user preferences if they exist and no values are set yet
    if (user?.preferences) {
      if (!preferences.wakeup && user.preferences.wakeup) {
        dispatch({ type: SET_WAKEUP, wakeup: user.preferences.wakeup });
      }
      if (!preferences.sleep && user.preferences.sleep) {
        dispatch({ type: SET_SLEEP, sleep: user.preferences.sleep });
      }
    }
  }, [user]);

  useEffect(() => {
    // Set wakeup and sleep times from user preferences on first load
    if (user?.preferences?.wakeup) {
      dispatch({ type: SET_WAKEUP, wakeup: user.preferences.wakeup })
    }
    if (user?.preferences?.sleep) {
      dispatch({ type: SET_SLEEP, sleep: user.preferences.sleep })
    }
  }, [user]) // Only run when user data changes

  return (
    <Section className="w-full">
      <div className="flex flex-col gap-8 items-center py-8 w-full h-full md:p-8 max-sm:items-start">
        <div className="space-y-2 text-center w-full">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 md:text-2xl">
            Daily Schedule Preferences
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 md:text-base max-w-lg mx-auto max-sm:mx-0">
            Set your daily wake-up and bedtime to help us create a schedule that matches your natural rhythm
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 w-full max-w-xl">
          {timeTypes.map(timeType => {
            const isWakeUp = timeType === 'Wake Up';
            const value = isWakeUp ? preferences.wakeup : preferences.sleep;
            const handleChange = (newValue) => {
              if (isWakeUp) {
                dispatch({ type: SET_WAKEUP, wakeup: newValue });
              } else {
                dispatch({ type: SET_SLEEP, sleep: newValue });
              }
            };

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
            );
          })}
        </div>

        <div className="w-full max-w-xl pt-4">
          <ScheduleIntensity />
        </div>
      </div>
    </Section>
  )
}
