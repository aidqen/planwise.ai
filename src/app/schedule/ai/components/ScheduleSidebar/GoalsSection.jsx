import { Goal, Target } from "lucide-react";
import { CollapsibleSection } from "./CollapsibleSection";

export function GoalsSection({ goals, isOpen, onToggle }) {

    function getImportanceStyles(importance) {
        const styles = {
            low: {
                bg: 'bg-green-50',
                text: 'text-green-700',
                ring: 'ring-green-600/20'
            },
            medium: {
                bg: 'bg-yellow-50',
                text: 'text-yellow-800',
                ring: 'ring-yellow-600/20'
            },
            high: {
                bg: 'bg-red-50',
                text: 'text-red-700',
                ring: 'ring-red-600/20'
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
                    <div key={index} className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg">
                        <Target className="flex-shrink-0 w-4 h-4 mt-0.5 text-indigo-500" />
                        <div className="flex-grow">
                            <div className="flex flex-col gap-2 items-start">
                                <h4 className="text-sm font-medium text-gray-900">{goal.name}</h4>
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