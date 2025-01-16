import { Moon, Settings, Sun, UserRoundPen, Zap } from "lucide-react";
import { CollapsibleSection } from "./CollapsibleSection";

export function PreferencesSection({ preferences, isOpen, onToggle }) {
    if (!preferences) return null
    return (
        <CollapsibleSection 
            title="Schedule Preferences" 
            icon={UserRoundPen}
            isOpen={isOpen}
            onToggle={onToggle}
            iconColor="#5fa8d3"
        >
            <div className="mt-3 space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700/50">
                    <div className="flex gap-2 items-center">
                        <Sun className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Wake up</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{preferences?.wakeup}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700/50">
                    <div className="flex gap-2 items-center">
                        <Moon className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Sleep</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{preferences?.sleep}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700/50">
                    <div className="flex gap-2 items-center">
                        <Zap className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Intensity</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{preferences?.intensity}</span>
                </div>
            </div>
        </CollapsibleSection>
    )
}