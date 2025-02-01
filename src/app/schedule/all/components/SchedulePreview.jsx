import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { getIntensityColor } from "@/services/util.service";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export function SchedulePreview({ schedule }) {
    const router = useRouter()

    function navigateToSchedule() {
        router.replace(`/schedule/ai/${schedule?.id}`)
    }

    return (
        <div
            key={schedule?.id}
            onClick={navigateToSchedule}
            className="flex relative flex-col gap-3 p-4 w-full min-w-0 bg-white rounded-lg border border-gray-200 shadow-sm transition-shadow cursor-pointer sm:p-6 dark:bg-gray-800 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20"
        >
            <div className="flex gap-2 justify-between items-start w-full">
                <div className="overflow-hidden flex-grow min-w-0">
                    <h3 className="min-w-0 text-lg font-semibold text-gray-900 truncate dark:text-white">
                        {schedule?.name}
                    </h3>
                    <p className="flex items-center my-1.5 text-sm text-gray-500 dark:text-gray-400 truncate min-w-0">
                        <Calendar className="flex-shrink-0 mr-1 w-4 h-4" />
                        <span className="truncate">Updated at: {format(new Date(schedule.updatedAt), "MMM d, h:mm a")}</span>
                    </p>
                    <div className="flex items-center min-w-0 text-sm text-gray-600 truncate dark:text-gray-300">
                        <Clock className="flex-shrink-0 mr-2 w-4 h-4" />
                        <span className="truncate">
                            {schedule?.preferences.wakeup} - {schedule?.preferences.sleep}
                        </span>
                    </div>
                </div>
                <span
                    className={cn(
                        "inline-flex items-center px-2 py-0.5  rounded-full text-xs font-medium ml-2 flex-shrink-0 min-w-[60px] text-center",
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
                                    className="flex gap-2 items-center min-w-0 text-sm text-gray-600 truncate dark:text-gray-300"
                                >
                                    <span className="flex-grow min-w-0 truncate">{routine?.name}</span>
                                    <span className="flex-shrink-0 text-xs text-gray-500 whitespace-nowrap dark:text-gray-400">
                                        ({routine?.startTime} - {routine?.endTime})
                                    </span>
                                </li>))}

                            <li className='text-sm text-blue-600 dark:text-blue-400'>
                                {schedule?.routines?.length - 2}
                                <Tooltip>
                                    <TooltipTrigger className='ml-1.5'>
                                        more...
                                    </TooltipTrigger>
                                    <TooltipContent className="flex flex-col gap-1 bg-white border dark:border-gray-600 dark:bg-gray-800 max-w-[250px] w-screen">
                                        {schedule?.routines?.map((routine, index) => (
                                            <span
                                                key={index}
                                                className="flex gap-2 items-center min-w-0 text-sm text-gray-600 truncate dark:text-gray-300"
                                            >
                                                <span className="flex-grow min-w-0 truncate">{routine?.name}</span>
                                                <span className="flex-shrink-0 text-xs text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    ({routine?.startTime} - {routine?.endTime})
                                                </span>
                                            </span>))}
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
                                    className="flex gap-2 items-center min-w-0 text-sm text-gray-600 truncate dark:text-gray-300"
                                >
                                    <span className="flex-grow min-w-0 truncate">{routine?.name}</span>
                                    <span className="flex-shrink-0 text-xs text-gray-500 whitespace-nowrap dark:text-gray-400">
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
                                    className="min-w-0 text-sm text-gray-600 truncate dark:text-gray-300"
                                >
                                    {goal?.name}
                                </li>))}

                            <li className='text-sm text-blue-600 dark:text-blue-400'>
                                {schedule?.goals?.length - 2}
                                <Tooltip>
                                    <TooltipTrigger className='ml-1.5'>
                                        more...
                                    </TooltipTrigger>
                                    <TooltipContent className="flex flex-col gap-1 bg-white border dark:border-gray-600 dark:bg-gray-800 max-w-[250px] w-screen">
                                        {schedule?.goals?.map((goal, index) => (
                                            <span
                                                key={index}
                                                className="min-w-0 text-sm text-gray-600 truncate dark:text-gray-300"
                                            >
                                                {goal?.name}
                                            </span>))}
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
                                    className="min-w-0 text-sm text-gray-600 truncate dark:text-gray-300"
                                >
                                    {goal?.name}
                                </li>))
                    }
                </ul>
            </div>
        </div>
    )
}