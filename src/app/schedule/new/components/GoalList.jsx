import { AnimatePresence } from "framer-motion";
import { GoalListItem } from "./GoalListItem";

export function GoalList({ goals, updateGoalImportance, removeGoal }) {
  return (
    <div className="space-y-3 max-h-[350px] overflow-y-auto py-2 pb-0 px-1 scrollbar-hidden">
      <AnimatePresence>
        {goals.map(goal => (
          <GoalListItem
            key={goal.id}
            goal={goal}
            onChangeImportance={updateGoalImportance}
            onRemove={removeGoal}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
