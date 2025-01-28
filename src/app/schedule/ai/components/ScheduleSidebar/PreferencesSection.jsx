import { Moon, Sun, UserRoundPen, Zap } from "lucide-react";
import { CollapsibleSection } from "./CollapsibleSection";
import { EditablePreference } from "./EditablePreference";
import { useDispatch, useSelector } from "react-redux";

export function PreferencesSection({ preferences, isOpen, onToggle, onSaveSchedule }) {
    const user = useSelector(state => state.userModule.user)
    const dispatch = useDispatch()
    console.log("🚀 ~ file: PreferencesSection.jsx:8 ~ user:", user)
    if (!preferences) return null

    function handlePreferenceEdit( key, newValue ) {
        onSaveSchedule('preferences', { ...preferences, [key]: newValue })
        
    }
    return (
        <CollapsibleSection
            title="Schedule Preferences"
            icon={UserRoundPen}
            isOpen={isOpen}
            onToggle={onToggle}
            iconColor="#5fa8d3"
        >
            <div className="mt-3 space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800/50 dark:border-gray-700/50">
                    <div className="flex gap-2 items-center">
                        <Sun className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Wake up</span>
                    </div>
                    <EditablePreference value={preferences?.wakeup} type="time" handlePreferenceEdit={handlePreferenceEdit} keyName={'wakeup'} />
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800/50 dark:border-gray-700/50">
                    <div className="flex gap-2 items-center">
                        <Moon className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Sleep</span>
                    </div>
                    <EditablePreference value={preferences?.sleep} type="time" handlePreferenceEdit={handlePreferenceEdit} keyName={'sleep'} />
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800/50 dark:border-gray-700/50">
                    <div className="flex gap-2 items-center">
                        <Zap className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Intensity</span>
                    </div>
                    <EditablePreference value={preferences?.intensity} type="intensity" handlePreferenceEdit={handlePreferenceEdit} keyName={'intensity'} />
                </div>
            </div>
        </CollapsibleSection>
    )
}