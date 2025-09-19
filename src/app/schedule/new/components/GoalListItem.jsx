import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { getImportanceColor } from "@/services/util.service";

export function GoalListItem({ goal, onChangeImportance, onRemove }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="grid gap-3 px-4 py-3 rounded-lg shadow-md transition-all duration-200 grid-cols-[1fr_auto] dark:border hover:bg-opacity-20 dark:hover:bg-opacity-30 border border-white/15"
    >
      <div className="flex flex-col gap-2 min-w-0">
        <span className="text-base font-medium text-gray-800 dark:text-gray-200 truncate">
          {goal.name}
        </span>
        <Select value={goal.importance} onValueChange={(value) => onChangeImportance(goal.id, value)}>
          <SelectTrigger
            className={cn("w-[96px] border-0", getImportanceColor(goal.importance), "bg-gray-800/70")}
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
        onClick={() => onRemove(goal.id)}
        className="flex justify-center items-center w-8 h-8 text-gray-400 rounded-full transition-all duration-200 dark:text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-900/50 active:bg-red-100"
      >
        <X className="w-4 h-4" />
      </Button>
    </motion.div>
  );
}

export default GoalListItem

