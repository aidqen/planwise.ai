import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Coffee, Repeat, Target, Utensils } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function TaskCard({ task, wakeupMinutes, parseTimeToMinutes, handleTaskClick, columnIndex, totalColumns }) {
  const [isDescVisible, setIsDescVisible] = useState(false);
  const [rowOrColumn, setRowOrColumn] = useState("");

  const startTotalMinutes = parseTimeToMinutes(task?.start || "00:00");
  const endTotalMinutes = parseTimeToMinutes(task?.end || "00:00");

  let duration = endTotalMinutes - startTotalMinutes;
  if (duration < 0) {
    duration += 24 * 60; // Handle tasks that span midnight
  }

  const top = ((startTotalMinutes - wakeupMinutes) / (24 * 60)) * 100;
  const height = (duration / (24 * 60)) * 100;

  // Calculate width and position based on columnIndex and totalColumns
  const width = 100 / totalColumns;
  const left = columnIndex * width;

  // Dynamic z-index based on columnIndex (higher index = lower priority)
  const zIndex = totalColumns - columnIndex;

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

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'break':
        return Coffee;
      case 'goal':
        return Target;
      case 'routine':
        return Repeat;
      case 'meal':
        return Utensils;
      default:
        return Clock;
    }
  };

  const CategoryIcon = getCategoryIcon(task?.category);

  const getTaskClasses = (category) => {
    const baseClasses = "absolute px-2 py-0 text-white rounded-lg shadow-sm transition-all duration-100 ease-in-out cursor-pointer hover:scale-[1.01] origin-center hover:z-[80] hover:shadow-md dark:shadow-black/20 dark:hover:shadow-black/40 border border-white/10 dark:border-black/10";
    
    const categoryClasses = {
      break: "bg-blue-500 dark:bg-blue-600",
      goal: "bg-cyan-500 dark:bg-cyan-600",
      routine: "bg-sky-600 dark:bg-sky-700",
      meal: "bg-green-500 dark:bg-green-600",
      default: "bg-gray-400 dark:bg-gray-500"
    };

    return cn(baseClasses, categoryClasses[category] || categoryClasses.default);
  };

  return (
    <Card
      onClick={() => handleTaskClick(task)}
      className={getTaskClasses(task?.category)}
      style={{
        top: `${top}%`,
        height: `${height}%`,
        width: `${width}%`,
        left: `${left}%`,
        zIndex,
      }}
    >
      <CardHeader className={`flex p-0 space-y-0 ${rowOrColumn}`}>
        <div className="flex items-center gap-1.5">
          <CategoryIcon className="w-3 h-3 text-white/90" />
          <CardTitle className="text-xs font-semibold truncate text-white/95">{task?.summary}</CardTitle>
        </div>
        {isDescVisible && <CardDescription className="mt-0 text-xs truncate text-white/80">{task?.description}</CardDescription>}
        <CardDescription className="mt-0 text-xs truncate text-white/80">
          {task.start} - {task.end}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
