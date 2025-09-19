import { AnimatePresence } from "framer-motion";
import { GoalListItem } from "./GoalListItem";

export function GoalList({ goals, updateGoalImportance, removeGoal }) {
  return (
    <div className="space-y-2 max-h-[350px] overflow-y-auto  pb-2 px-0 scrollbar-hidden">
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
