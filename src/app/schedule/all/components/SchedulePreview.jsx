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
            className="flex relative flex-col gap-3 p-4 sm:p-6 w-full min-w-0 bg-white rounded-lg border border-gray-200 shadow-sm transition-shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20"
        >
            <div className="flex justify-between items-start w-full gap-2">
                <div className="flex-grow min-w-0 overflow-hidden">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate min-w-0">
                        {schedule?.name}
                    </h3>
                    <p className="flex items-center my-1.5 text-sm text-gray-500 dark:text-gray-400 truncate min-w-0">
                        <Calendar className="mr-1 w-4 h-4 flex-shrink-0" />
                        <span className="truncate">Updated at: {format(new Date(schedule.updatedAt), "MMM d, h:mm a")}</span>
                    </p>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 truncate min-w-0">
                        <Clock className="mr-2 w-4 h-4 flex-shrink-0" />
                        <span className="truncate">
                            {schedule?.preferences.wakeup} - {schedule?.preferences.sleep}
                        </span>
                    </div>
                </div>
                <span
                    className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ml-2 flex-shrink-0 min-w-[60px] text-center",
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
                                    className="flex gap-2 items-center text-sm text-gray-600 dark:text-gray-300 truncate min-w-0"
                                >
                                    <span className="truncate min-w-0 flex-grow">{routine?.name}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap flex-shrink-0">
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
                                                className="flex gap-2 items-center text-sm text-gray-600 dark:text-gray-300 truncate min-w-0"
                                            >
                                                <span className="truncate min-w-0 flex-grow">{routine?.name}</span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap flex-shrink-0">
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
                                    className="flex gap-2 items-center text-sm text-gray-600 dark:text-gray-300 truncate min-w-0"
                                >
                                    <span className="truncate min-w-0 flex-grow">{routine?.name}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap flex-shrink-0">
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
                                    className="text-sm text-gray-600 dark:text-gray-300 truncate min-w-0"
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
                                                className="text-sm text-gray-600 dark:text-gray-300 truncate min-w-0"
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
                                    className="text-sm text-gray-600 dark:text-gray-300 truncate min-w-0"
                                >
                                    {goal?.name}
                                </li>))
                    }
                </ul>
            </div>
        </div>
    )
}