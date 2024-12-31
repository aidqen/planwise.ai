import { ScheduleIntensity } from '@/components/ScheduleIntensity'
import TimePicker from '@/components/TimePicker'
import { Section } from '@/components/ui/section'

export function Preferences({ }) {
  // const [preferences, setPreferences] = useState({
  //   wakeup: '7:00 AM',
  //   sleep: '10:00 PM',
  //   intensity: 'relaxed',
  // })

  const timeTypes = ['Wake Up', 'Sleep']

  return (
    <Section>
      <div className="flex flex-col gap-9 items-center px-3 mt-10 w-full h-full max-sm:items-start">
      <h3 className="w-full text-xl font-medium text-center text-gray-900">
        How's your day looking?
      </h3>
        <div className="flex flex-row justify-between items-center max-sm:w-full w-[30em] mb-3">
          {timeTypes.map(timeType => (
            <div
              key={timeType}
              className="flex flex-col gap-2 justify-start items-start"
            >
              <label className="text-base font-normal max-sm:text-sm text-black/80">{timeType}</label>
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
