import { Moon, Settings, Sun, Zap } from "lucide-react";
import { CollapsibleSection } from "./CollapsibleSection";

export function PreferencesSection({ preferences, isOpen, onToggle }) {
    return (
        <CollapsibleSection 
            title="Schedule Preferences" 
            icon={Settings}
            isOpen={isOpen}
            onToggle={onToggle}
            iconColor="#5fa8d3"
        >
            <div className="mt-3 space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex gap-2 items-center">
                        <Sun className="w-4 h-4 text-amber-500" />
                        <span className="text-sm text-gray-700">Wake up</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{preferences?.wakeup}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex gap-2 items-center">
                        <Moon className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-700">Sleep</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{preferences?.sleep}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex gap-2 items-center">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-gray-700">Intensity</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{preferences?.intensity}</span>
                </div>
            </div>
        </CollapsibleSection>
    )
}