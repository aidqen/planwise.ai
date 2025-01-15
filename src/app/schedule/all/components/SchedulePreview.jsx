import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export function SchedulePreview({ schedule }) {
    const router = useRouter()

    function navigateToSchedule() {
        router.replace(`/schedule/ai/${schedule?.id}`)
    }
    
    const getIntensityColor = (intensity) => {
        switch (intensity) {
            case "relaxed":
                return "bg-green-100 text-green-800";
            case "moderate":
                return "bg-blue-100 text-blue-800";
            case "intense":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };
    return (
        <div
            key={schedule?.id}
            onClick={navigateToSchedule}
            className="relative p-6 min-w-max bg-white rounded-lg border border-gray-200 shadow-sm transition-shadow cursor-pointer hover:shadow-md xl:min-w-md"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        {schedule?.name}
                    </h3>
                    <p className="flex items-center my-1.5 text-sm text-gray-500">
                        <Calendar className="mr-1 w-4 h-4" />
                        Updated {format(new Date(schedule.updatedAt), "MMM d, h:mm a")}
                    </p>
                    <div className="flex items-center text-sm text-gray-600">
                        <Clock className="mr-2 w-4 h-4" />
                        <span>
                            {schedule?.preferences.wakeup} - {schedule?.preferences.sleep}
                        </span>
                    </div>
                </div>
                <span
                    className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        getIntensityColor(schedule?.preferences.intensity)
                    )}
                >
                    {schedule?.preferences.intensity}
                </span>
            </div>


            <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900">Goals:</h4>
                <ul className="space-y-1">
                    {schedule?.goals?.length > 2 ?
                        <>
                            {schedule?.goals.length && schedule?.goals?.slice(0, 2).map((goal, index) => (
                                <li
                                    key={index}
                                    className={"text-sm text-gray-600"}
                                >
                                    {goal?.name}
                                </li>))}
                            <li className='text-sm text-blue-600'>
                                {schedule?.goals?.length - 2} more...
                            </li>
                        </>
                        :
                        !schedule?.goals?.length ?
                            <p className='text-sm text-gray-600'>None</p>
                            :
                            schedule?.goals?.map((goal, index) => (
                                <li
                                    key={index}
                                    className={"text-sm font-medium text-blue-600"}
                                >
                                    {goal?.name}
                                </li>))
                    }

                </ul>
            </div>
        </div>
    )
}