import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
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
                return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";
            case "moderate":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300";
            case "intense":
                return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
        }
    };
    return (
        <div
            key={schedule?.id}
            onClick={navigateToSchedule}
            className="flex flex-col gap-3 relative p-6 min-w-max bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-shadow cursor-pointer hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20 xl:min-w-md"
        >
        {/* <div className="flex flex-col gap-6"> */}
            <div className="flex justify-between items-start mb-0">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {schedule?.name}
                    </h3>
                    <p className="flex items-center my-1.5 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="mr-1 w-4 h-4" />
                        Updated at: {format(new Date(schedule.updatedAt), "MMM d, h:mm a")}
                    </p>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
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
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Routines:</h4>
                    <ul className="space-y-1">
                        {schedule?.routines?.length > 2 ?
                            <>
                                {schedule?.routines.length && schedule?.routines?.slice(0, 2).map((routine, index) => (
                                    <li
                                        key={index}
                                        className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2"
                                    >
                                        <span>{routine?.name}</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            ({routine?.startTime} - {routine?.endTime})
                                        </span>
                                    </li>))}

                                <li className='text-sm text-blue-600 dark:text-blue-400'>
                                    {schedule?.routines?.length - 2}
                                    <Tooltip>
                                        <TooltipTrigger className='ml-1.5'>
                                            more...
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-white border dark:border-gray-600 dark:bg-gray-800">
                                            {schedule?.routines?.map((routine, index) => (
                                                <li
                                                    key={index}
                                                    className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2"
                                                >
                                                    <span>{routine?.name}</span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        ({routine?.startTime} - {routine?.endTime})
                                                    </span>
                                                </li>))}
                                        </TooltipContent>
                                    </Tooltip>
                                </li>
                            </>
                            :
                            !schedule?.routines?.length ?
                                <p className='text-sm text-gray-600 dark:text-gray-400'>None</p>
                                :
                                schedule?.routines?.map((routine, index) => (
                                    <li
                                        key={index}
                                        className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2"
                                    >
                                        <span>{routine?.name}</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            ({routine?.startTime} - {routine?.endTime})
                                        </span>
                                    </li>))
                        }
                    </ul>
                </div>

                <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Goals:</h4>
                    <ul className="space-y-1">
                        {schedule?.goals?.length > 2 ?
                            <>
                                {schedule?.goals.length && schedule?.goals?.slice(0, 2).map((goal, index) => (
                                    <li
                                        key={index}
                                        className="text-sm text-gray-600 dark:text-gray-300"
                                    >
                                        {goal?.name}
                                    </li>))}

                                <li className='text-sm text-blue-600 dark:text-blue-400'>
                                    {schedule?.goals?.length - 2}
                                    <Tooltip>
                                        <TooltipTrigger className='ml-1.5'>
                                            more...
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-white border dark:border-gray-600 dark:bg-gray-800">
                                            {schedule?.goals?.map((goal, index) => (
                                                <li
                                                    key={index}
                                                    className="text-sm text-gray-600 dark:text-gray-300"
                                                >
                                                    {goal?.name}
                                                </li>))}
                                        </TooltipContent>
                                    </Tooltip>
                                </li>
                            </>
                            :
                            !schedule?.goals?.length ?
                                <p className='text-sm text-gray-600 dark:text-gray-400'>None</p>
                                :
                                schedule?.goals?.map((goal, index) => (
                                    <li
                                        key={index}
                                        className="text-sm text-gray-600 dark:text-gray-300"
                                    >
                                        {goal?.name}
                                    </li>))
                        }
                    </ul>
                {/* </div> */}
            </div>
        </div>
    )
}