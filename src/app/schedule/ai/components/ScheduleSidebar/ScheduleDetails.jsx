import { CategoryDropdown } from "./CategoryDropdown";
import { GoalsSection } from "./GoalsSection";
import { PreferencesSection } from "./PreferencesSection";
import { RoutinesSection } from "./RoutinesSection";

export function ScheduleDetails({ schedule, openSection, toggleSection, onSaveSchedule }) {
    console.log("🚀 ~ file: ScheduleDetails.jsx:7 ~ schedule:", schedule)
    return (
        <div className="space-y-4 px-5 pb-20 overflow-y-auto max-h-[calc(100vh-16rem)] scrollbar scroll-container">
            <PreferencesSection 
                preferences={schedule?.preferences} 
                isOpen={openSection === 'preferences'}
                onToggle={() => toggleSection('preferences')}
                onSaveSchedule={onSaveSchedule}
            />
            <GoalsSection 
                goals={schedule?.goals} 
                isOpen={openSection === 'goals'}
                onToggle={() => toggleSection('goals')}
            />
            <RoutinesSection 
                routines={schedule?.routines} 
                isOpen={openSection === 'routines'}
                onToggle={() => toggleSection('routines')}
            />
            {schedule?.schedule?.length ? <CategoryDropdown schedule={schedule} /> : null}
        </div>
    )
}