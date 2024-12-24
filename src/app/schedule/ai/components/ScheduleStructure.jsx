import { format } from "date-fns";


export function ScheduleStructure({ wakeupMinutes }) {
    return (
        <>
            {Array.from({ length: 24 }).map((_, index) => {
                const hour = Math.floor((wakeupMinutes + index * 60) / 60) % 24;
                return (
                    <div
                        key={index}
                        className="absolute left-0 w-full text-sm text-gray-400"
                        style={{ top: `${(index / 24) * 100}%` }}
                    >
                        <div className="absolute -left-16 w-12 text-right">
                            {format(new Date().setHours(hour, 0, 0, 0), 'h a')}
                        </div>
                        <div className="h-[1px] bg-gray-200" />
                    </div>
                );
            })}
        </>
    );
}