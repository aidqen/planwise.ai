import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export function TaskCard({ task, wakeupMinutes, handleTaskClick }) {
  // Ensure task has valid start and end times
  if (!task?.start || !task?.end) {
    return null;
  }

  // Convert "HH:mm" strings into total minutes since midnight
  const parseTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const startTotalMinutes = parseTimeToMinutes(task.start);
  const endTotalMinutes = parseTimeToMinutes(task.end);

  let duration = endTotalMinutes - startTotalMinutes;
  if (duration < 0) {
    duration += 24 * 60; // Handle tasks that span midnight
  }

  // Adjust top and height to start from wake-up time
  const top = ((startTotalMinutes - wakeupMinutes) / (24 * 60)) * 100;
  const height = (duration / (24 * 60)) * 100;

  let rowOrColumn =
    height < 3 ? "flex-row justify-between" : "flex-col items-start justify-between";

  return (
    <Card
      onClick={(e) => handleTaskClick(task)}
      className="absolute left-4 px-3 py-2 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md hover:scale-[1.02] bg-secondary cursor-pointer text-white w-[100%]"
      style={{
        top: `${top}%`,
        height: `${height}%`,
        minHeight: "40px",
      }}
    >
      <CardHeader className={`p-0 space-y-0 flex ${rowOrColumn} gap-1`}>
        <CardTitle className="text-xs font-semibold truncate">{task?.summary}</CardTitle>
        <CardDescription className="text-xs mt-0 truncate">
          {task.start} - {task.end}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}