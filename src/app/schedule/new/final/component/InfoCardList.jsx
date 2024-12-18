'use client'

import { Clock, Moon, Repeat, Sun, Target } from "lucide-react"
import { useSelector } from "react-redux"
import { InfoCard } from "./InfoCard"

export function InfoCardList() {
    const schedule = useSelector(state => state.scheduleModule.multiStepForm)
    const { preferences, goals, routines } = schedule

    const scheduleCardList = [
        { icon: Sun, title: "Wake Time", content: preferences.wakeup, color: "#EAB308" },
        { icon: Moon, title: "Sleep Time", content: preferences.sleep, color: "#3B82F6" },
        { icon: Clock, title: "Intensity", content: preferences.intensity, color: "#6B7280" }, 
        { icon: Target, title: "Goals", content: goals, isList: true, color: "#22C55E" }, 
        { icon: Repeat, title: "Routines", content: routines, isList: true, color: "#A855F7" }, 
    ];

    return (
        <div className="grid gap-4">
            {scheduleCardList.map((item, index) => (
                <InfoCard key={index} item={item} />
            ))}
        </div>
    );
}