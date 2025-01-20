import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Edit2, Trash, X } from "lucide-react";

export function RoutinePreview({ routine, deleteRoutine, toggleEditing }) {
  return (
    <div className="overflow-hidden relative bg-white rounded-lg border border-gray-200 transition-all duration-300 dark:border-indigo-950 group dark:bg-gray-800 hover:border-blue-200 dark:hover:border-blue-800">

      <div className="p-4">
        <div className="flex flex-col space-y-2 md:space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
              {routine.name}
            </h3>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-sm whitespace-nowrap">
                {routine.startTime} - {routine.endTime}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-3 items-start h-9">
            <Button
              variant="outline"
              size="icon"
              className="px-4 w-max h-full text-red-500 dark:text-red-400 border-red-500/50 dark:border-red-500/30 hover:bg-red-50 dark:bg-gray-900/50 dark:hover:bg-red-900/50 hover:text-red-600 dark:hover:text-red-300"
              onClick={() => deleteRoutine(routine.id)}
            >
              <Trash />
              {/* <X className="w-4 h-4" /> */}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleEditing(routine.id, true)}
              className="w-full h-full text-blue-500 dark:text-blue-400 border-blue-500/50 dark:border-blue-500/30 hover:bg-blue-50 dark:bg-gray-900/50 dark:hover:bg-blue-900/50 hover:text-blue-600 dark:hover:text-blue-300"
            >
              <Edit2 className="mr-2 w-4 h-4" />
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}