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

  function assignClasses() {
    let classes
    if (height < 3.3) {
      classes = "flex-row justify-between z-[100] ";
      if (height < 1.5) {
        classes += "py-0";
      } else classes += "py-1";
    } else classes = "flex-col gap-0.5 py-2"
    return classes
  }

  let rowOrColumn = assignClasses()

  return (
    <Card
      onClick={(e) => handleTaskClick(task)}
      className="absolute left-4 px-3 py-0 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md hover:scale-[1.01] bg-secondary hover:bg-blue-600 cursor-pointer text-white w-[100%]"
      style={{
        top: `${top}%`,
        height: `${height}%`,
        minHeight: "40px",
      }}
    >
      <CardHeader className={`flex p-0 space-y-0 ${rowOrColumn}`}>
        <CardTitle className="text-xs font-semibold truncate">{task?.summary}</CardTitle>
        <CardDescription className="mt-0 text-xs truncate">
          {task.start} - {task.end}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}