import { Button } from "@/components/ui/button";
import { Clock, Edit2, Trash } from "lucide-react";

export function RoutinePreview({ routine, deleteRoutine, toggleEditing }) {
  return (
    <div className="group relative p-4 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800/50 transition-all duration-200">
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1.5">
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
              {routine.name}
            </h3>
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
              <Clock className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              <span className="text-sm font-medium">
                {routine.startTime} - {routine.endTime}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              onClick={() => toggleEditing(routine.id, true)}
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={() => deleteRoutine(routine.id)}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}