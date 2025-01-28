import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AnimatePresence, motion, Reorder } from "framer-motion";
import { GripVertical, X } from "lucide-react";

export function GoalList({ goals, saveGoals, updateGoalImportance, removeGoal, importanceColors, handleReorder }) {
  return (
    <Reorder.Group
      axis="y"
      values={goals}
      onReorder={handleReorder}
      className="space-y-3 max-h-[400px] overflow-y-auto py-2 px-1"
    >
      <AnimatePresence>
        {goals.map(goal => (
          <Reorder.Item
            key={goal.id}
            value={goal}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="focus:outline-none"
          >
            <motion.div
              className={`grid gap-3 p-4 rounded-lg shadow-md transition-all duration-200 grid-cols-[auto_1fr_auto] dark:bg-gray-800/50 hover:bg-opacity-20 dark:hover:bg-opacity-30`}
            >
              <div className="flex items-center">
                <GripVertical className="w-5 h-5 text-gray-400 transition-colors duration-200 cursor-grab hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 active:cursor-grabbing active:text-gray-700" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-base font-medium text-gray-800 dark:text-gray-200">
                  {goal.name}
                </span>
                <Select
                  value={goal.importance}
                  onValueChange={value => updateGoalImportance(goal.id, value)}
                >
                  <SelectTrigger
                    className={`w-[120px] border-0 bg-opacity-50 dark:bg-opacity-30 bg-gray-200 dark:bg-gray-700 ${
                      importanceColors[goal.importance]
                    }`}
                  >
                    <SelectValue placeholder="Importance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low" className="text-green-700 dark:text-green-400">
                      Low
                    </SelectItem>
                    <SelectItem value="medium" className="text-yellow-700 dark:text-yellow-400">
                      Medium
                    </SelectItem>
                    <SelectItem value="high" className="text-red-700 dark:text-red-400">
                      High
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeGoal(goal.id)}
                className="flex justify-center items-center w-8 h-8 text-gray-400 rounded-full transition-all duration-200 dark:text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-900/50 active:bg-red-100"
              >
                <X className="w-4 h-4" />
              </Button>
            </motion.div>
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
}
