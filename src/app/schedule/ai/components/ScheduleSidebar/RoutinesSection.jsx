import { Repeat } from "lucide-react";
import { CollapsibleSection } from "./CollapsibleSection";

export function RoutinesSection({ routines, isOpen, onToggle }) {
    return (
        <CollapsibleSection 
            title="Routines" 
            icon={Repeat}
            isOpen={isOpen}
            onToggle={onToggle}
            iconColor="#064789"
            length={routines?.length}
        >
            <div className="mt-3 space-y-2">
                {routines?.map((routine, index) => (
                    <div key={index} className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg">
                        <Repeat className="flex-shrink-0 w-4 h-4 mt-0.5 text-sky-500" />
                        <div className="flex-grow">
                            <h4 className="text-sm font-medium text-gray-900">{routine.name}</h4>
                            <p className="mt-1 text-xs text-gray-600">
                                {routine.startTime} - {routine.endTime}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </CollapsibleSection>
    )
}