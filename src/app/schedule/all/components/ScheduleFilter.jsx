import { cn } from "@/lib/utils";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

export function ScheduleFilter({ tabs, setSelectedTab, selectedTab }) {
    const router = useRouter()

    function navigateToScheduleMaker() {
        router.replace('/schedule/new')
    }
    return (
        <>
            <div className="flex relative flex-row justify-between items-center mb-6 w-full border-b border-gray-200 max-sm:pt-10 max-sm:mb-4">
                {/* Invisible range input */}
                <input
                    type="range"
                    min="0"
                    max={tabs.length - 1}
                    value={tabs.findIndex((tab) => tab.id === selectedTab)} // Map id to index for slider
                    onChange={(event) =>
                        setSelectedTab(tabs[Number(event.target.value)].id) // Map slider value to id
                    }
                    className="absolute w-full opacity-0 pointer-events-none"
                />
                <nav className="flex -mb-px space-x-8 max-w-max max-sm:space-x-3">
                    {tabs?.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedTab(tab.id)} // Allow clicking buttons to change tabs
                            className={cn(
                                "whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors",
                                selectedTab === tab.id
                                    ? "border-blue-500 text-blue-600" // Active tab styling
                                    : "border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 hover:border-gray-300"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
                <button
                    className="absolute right-2 bottom-2 px-4 py-2 font-medium text-white bg-blue-500 dark:bg-blue-900 rounded-lg shadow-md transition-colors max-sm:left-1 max-sm:w-max max-sm:bottom-[3.2rem] hover:bg-blue-600"
                    onClick={navigateToScheduleMaker}
                >
                    + New Schedule
                </button>

            </div>
        </>
    );
}