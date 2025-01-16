import { Goal, Target } from "lucide-react";
import { CollapsibleSection } from "./CollapsibleSection";

export function GoalsSection({ goals, isOpen, onToggle }) {

    function getImportanceStyles(importance) {
        const styles = {
            low: {
                bg: 'bg-green-50 dark:bg-green-900/30',
                text: 'text-green-700 dark:text-green-400',
                ring: 'ring-green-600/20 dark:ring-green-400/30'
            },
            medium: {
                bg: 'bg-yellow-50 dark:bg-yellow-900/30',
                text: 'text-yellow-800 dark:text-yellow-400',
                ring: 'ring-yellow-600/20 dark:ring-yellow-400/30'
            },
            high: {
                bg: 'bg-red-50 dark:bg-red-900/30',
                text: 'text-red-700 dark:text-red-400',
                ring: 'ring-red-600/20 dark:ring-red-400/30'
            }
        }
        return styles[importance.toLowerCase()] || styles.medium
    }
    return (
        <CollapsibleSection 
            title="Goals" 
            icon={Goal}
            isOpen={isOpen}
            onToggle={onToggle}
            iconColor="#c1121f"
            length={goals?.length}
        >
            <div className="mt-3 space-y-2">
                {goals?.map((goal, index) => (
                    <div key={index} className="flex gap-3 items-start p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700/50">
                        <Target className="flex-shrink-0 w-4 h-4 mt-0.5 text-indigo-500 dark:text-indigo-400" />
                        <div className="flex-grow">
                            <div className="flex flex-col gap-2 items-start">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">{goal.name}</h4>
                                {goal.importance && (
                                    <span className={`inline-flex capitalize items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getImportanceStyles(goal.importance).bg} ${getImportanceStyles(goal.importance).text} ${getImportanceStyles(goal.importance).ring}`}>
                                        {goal.importance}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </CollapsibleSection>
    )
}