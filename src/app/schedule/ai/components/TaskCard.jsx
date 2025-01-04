import { useState, useEffect } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pen } from "lucide-react";

export function TaskCard({ task, wakeupMinutes, handleTaskClick, overlappingTasks }) {
  const [isDescVisible, setIsDescVisible] = useState(false);
  const [rowOrColumn, setRowOrColumn] = useState("");

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

  const top = ((startTotalMinutes - wakeupMinutes) / (24 * 60)) * 100;
  const height = (duration / (24 * 60)) * 100;

  // Calculate the width and left position based on overlapping tasks
  const totalOverlapping = overlappingTasks.length;
  const index = overlappingTasks.findIndex(t => t.id === task.id);
  const width = 100 / totalOverlapping;
  const left = (index * width) + 3; // Add 4 to account for the left padding

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
        return '#3b82f6';
      case 'goal':
        return '#06b6d4';
      case 'routine':
        return '#0284c7';
      case 'meal':
        return '#22c55e';
      default:
        return '#94A3B8';
    }
  }

  return (
    <Card
      onClick={() => handleTaskClick(task)}
      className="absolute px-2 py-0 text-white rounded-lg shadow-sm transition-all duration-100 ease-in-out cursor-pointer hover:shadow-md hover:ring-2 hover:z-20 hover:ring-blue-500"
      style={{
        top: `${top}%`,
        height: `${height}%`,
        width: `${width}%`,
        left: `${left}%`,
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
