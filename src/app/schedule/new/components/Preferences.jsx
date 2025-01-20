import { ScheduleIntensity } from '@/components/ScheduleIntensity'
import TimePicker from '@/components/TimePicker'
import { Section } from '@/components/ui/section'

export function Preferences({ }) {
  const timeTypes = ['Wake Up', 'Sleep']

  return (
    <Section className="w-full">
      <div className="flex flex-col gap-9 items-center py-6 w-full h-full md:p-6 max-sm:items-start">
      <h3 className="w-full text-lg font-semibold text-center text-gray-900 dark:text-gray-100 md:text-xl">
        How&apos;s your day looking?
      </h3>
        <div className="flex flex-row justify-between items-center mb-3 w-full">
          {timeTypes.map(timeType => (
            <div
              key={timeType}
              className="flex flex-col gap-2 justify-start items-start"
            >
              <label className="text-base font-normal max-sm:text-sm text-black/80 dark:text-white/80">{timeType}</label>
              <TimePicker
                timeType={timeType}
              />
            </div>
          ))}
        </div>
        <ScheduleIntensity />
      </div>
    </Section>
  )
}
