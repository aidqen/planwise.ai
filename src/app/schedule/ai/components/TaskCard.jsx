import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { useState, useEffect } from "react";

export function TaskCard({ task, wakeupMinutes, handleTaskClick }) {
  const [isDescVisible, setIsDescVisible] = useState(false);
  const [rowOrColumn, setRowOrColumn] = useState("");

  // Convert "HH:mm" strings into total minutes since midnight
  const parseTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const startTotalMinutes = parseTimeToMinutes(task?.start || "00:00");
  const endTotalMinutes = parseTimeToMinutes(task?.end || "00:00");

  let duration = endTotalMinutes - startTotalMinutes;
  if (duration < 0) {
    duration += 24 * 60; // Handle tasks that span midnight
  }

  // Adjust top and height to start from wake-up time
  const top = ((startTotalMinutes - wakeupMinutes) / (24 * 60)) * 100;
  const height = (duration / (24 * 60)) * 100;

  useEffect(() => {
    let classes = "";
    if (height > 4.5) {
      setIsDescVisible(true);
      classes = "flex-col gap-0.5 py-2";
    } else if (height < 3.3) {
      setIsDescVisible(false);
      classes = "flex-row justify-between z-[100] ";
      classes += height < 1.5 ? "py-0" : "py-1";
    } else {
      setIsDescVisible(false);
      classes = "flex-col gap-0.5 py-2";
    }
    setRowOrColumn(classes);
  }, [height]);

  if (!task?.start || !task?.end) {
    return null;
  }

  function handleTaskColor(category) {
    switch (category) {
      case 'break':
        return '#22C55E'; // Bright Green
      case 'goal':
        return '#3B82F6'; // Bright Blue
      case 'routine':
        return '#61CDBB'; // Bright Royal Blue
      case 'meal':
        return '#EAB308'; // Bright Gold
      default:
        return '#94A3B8'; // Bright Cool Gray
    }
  }

  return (
    <Card
      onClick={(e) => handleTaskClick(task)}
      className="absolute left-4 px-3 py-0 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md hover:scale-[1.01] cursor-pointer text-white w-[100%]"
      style={{
        top: `${top}%`,
        height: `${height}%`,
        // minHeight: "40px",
        backgroundColor: handleTaskColor(task?.category),

      }}
    >
      <CardHeader className={`flex p-0 space-y-0 ${rowOrColumn}`}>
        <CardTitle className="text-xs font-semibold truncate">{task?.summary}</CardTitle>
        {isDescVisible && <CardDescription className="mt-0 text-xs truncate text-white/90">{task?.description}</CardDescription>}
        <CardDescription className="mt-0 text-xs truncate text-white/90">
          {task.start} - {task.end}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}