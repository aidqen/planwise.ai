import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO } from "date-fns";

export function TaskCard({ task, wakeupMinutes, handleTaskClick }) {
    // Add null checks for task.start and task.end
    if (!task?.start || !task?.end) {
        return null;
    }

    const startDate = parseISO(task.start);
    const endDate = parseISO(task.end);
  
    const startHours = startDate.getHours();
    const startMinutes = startDate.getMinutes();
    const endHours = endDate.getHours();
    const endMinutes = endDate.getMinutes();
  
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
  
    let duration = endTotalMinutes - startTotalMinutes;
    if (duration < 0) {
      duration += 24 * 60; // Add 24 hours worth of minutes if task spans midnight
    }
  
    // Adjust top and height to start from wake-up time
    const top = ((startTotalMinutes - wakeupMinutes) / (24 * 60)) * 100;
    const height = (duration / (24 * 60)) * 100;

    let rowOrColumn = height < 3 ? 'flex-row justify-between' : 'flex-col items-start justify-between'
  
    return (
      <Card
        onClick={(e) => handleTaskClick(task)}
        className="absolute left-4 px-3 py-2 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md hover:scale-[1.02] bg-secondary cursor-pointer text-white w-[100%]"
        style={{
          top: `${top}%`,
          height: `${height}%`,
          minHeight: '40px',
        }}
      >
        <CardHeader className={`p-0 space-y-0 flex ${rowOrColumn} gap-1`}>
          <CardTitle className="text-xs font-semibold truncate">{task?.summary}</CardTitle>
          <CardDescription className="text-xs mt-0 truncate">
            {format(startDate, 'h:mm a')} - {format(endDate, 'h:mm a')}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }