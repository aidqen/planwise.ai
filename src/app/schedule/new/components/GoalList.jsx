import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AnimatePresence, motion, Reorder } from "framer-motion";
import { GripVertical, X } from "lucide-react";
import { getImportanceColor } from '@/services/util.service';
import { cn } from "@/lib/utils";

export function GoalList({ goals, updateGoalImportance, removeGoal, handleReorder }) {
  return (
    <Reorder.Group
      axis="y"
      values={goals}
      onReorder={handleReorder}
      className="space-y-3 max-h-[350px] overflow-y-auto py-2 pb-16 px-1 scrollbar-hidden"
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
              className="grid gap-3 p-4 rounded-lg shadow-md transition-all duration-200 grid-cols-[auto_1fr_auto] dark:bg-gray-800/50 hover:bg-opacity-20 dark:hover:bg-opacity-30"
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
                    className={cn(
                      "w-[80px] border-0 ",
                      getImportanceColor(goal.importance), "bg-gray-800/70"
                    )}
                  >
                    <SelectValue placeholder="Importance" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 z-[1000] dark:border-gray-700">
                    <SelectItem 
                      value="low" 
                      className={cn(
                        "text-green-700 dark:text-green-400",
                        "hover:bg-green-50 dark:hover:bg-green-500/10",
                        "dark:hover:bg-green-500/20 dark:hover:text-green-300"
                      )}
                    >
                      Low
                    </SelectItem>
                    <SelectItem 
                      value="medium" 
                      className={cn(
                        "text-yellow-700 dark:text-yellow-400",
                        "hover:bg-yellow-50 dark:hover:bg-yellow-500/10",
                        "dark:hover:bg-yellow-500/20 dark:hover:text-yellow-300"
                      )}
                    >
                      Medium
                    </SelectItem>
                    <SelectItem 
                      value="high" 
                      className={cn(
                        "text-red-700 dark:text-red-400",
                        "hover:bg-red-50 dark:hover:bg-red-500/10",
                        "dark:hover:bg-red-500/20 dark:hover:text-red-300"
                      )}
                    >
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
