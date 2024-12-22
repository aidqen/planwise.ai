import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Edit2, X } from "lucide-react";

export function RoutinePreview({ routine, deleteRoutine, toggleEditing }) {
     
    return <>
    <CardHeader className="flex px-6 py-1 flex-row items-center justify-between">
      <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        {routine.name}
      </CardTitle>
      <Button
        variant="ghost"
        size="icon"
        className="flex items-center justify-center text-gray-400 hover:text-red-600 dark:text-gray-600 dark:hover:text-red-400 transition-colors duration-300"
        onClick={() => deleteRoutine(routine.id)}
      >
        <X className="h-6 w-6" />
      </Button>
    </CardHeader>
    <CardContent className="px-6 pb-4 pt-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
          <Clock className="h-4 w-4" />
          <span>
            {routine.startTime} - {routine.endTime}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleEditing(routine.id, true)}
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-300"
        >
          <Edit2 className="h-4 w-4 mr-2" /> Edit
        </Button>
      </div>
    </CardContent>
  </>
}