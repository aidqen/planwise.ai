import { ScheduleIntensity } from "@/components/ScheduleIntensity";
import TimePicker from "@/components/TimePicker";

export function Preferences({ }) {

    const timeTypes = ["Wake Up", "Sleep"];
    return <>
        {/* <h1 className='text-2xl text-green-600'>Preferences</h1> */}
        <div className="flex flex-col gap-7 w-full mt-7">

            <div className="flex flex-row justify-between items-center w-full mb-3">
                {timeTypes.map(timeType => <div key={timeType} className="flex flex-col items-start justify-start gap-2">
                    <label className='font-normal text-lg text-black/80'>{timeType}</label>
                    <TimePicker timeType={timeType} />
                </div>)}
            </div>
            <ScheduleIntensity />
        </div>

    </>
}