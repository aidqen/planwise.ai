import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, ListChecks } from "lucide-react"
import { ScheduleDetails } from './ScheduleDetails'
import { AIChat } from './AIChat/AIChat'

export function SidebarContent({ 
    schedule, 
    setSchedule, 
    onScheduleEdit, 
    setIsLoading, 
    isLoading, 
    onSaveSchedule,
    openSection,
    toggleSection,
    activeView,
    setActiveView
}) {
    const views = [
        {
            id: 'details',
            label: 'Details',
            icon: <ListChecks className="w-4 h-4" />
        },
        {
            id: 'chat',
            label: 'AI Chat',
            icon: <MessageCircle className="w-4 h-4" />
        }
    ];

    return (
        <div className="flex flex-col h-full">
            <CardHeader className="flex-shrink-0 flex flex-col gap-1.5 pt-0 pb-4 sticky top-0 z-[20] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Schedule Details
                </CardTitle>
                <CardDescription className="mt-0 text-sm text-gray-600 font-regular dark:text-gray-400">
                    {activeView === "chat" ? "Ask AI to modify your schedule" : "View your preferences and tasks"}
                </CardDescription>
                <div className="grid grid-cols-2 gap-1 p-1.5 mt-2 rounded-lg backdrop-blur-sm bg-gray-100/80 dark:bg-gray-800/80">
                    {views.map(view => (
                        <button
                            key={view.id}
                            onClick={() => setActiveView(view.id)}
                            className={`flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                                activeView === view.id
                                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm dark:shadow-gray-900/50"
                                    : "text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50"
                            }`}
                        >
                            {view.icon}
                            {view.label}
                        </button>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 min-h-0">
                {activeView === "details" ? (
                    <ScheduleDetails
                        schedule={schedule}
                        openSection={openSection}
                        toggleSection={toggleSection}
                        onSaveSchedule={onSaveSchedule}
                    />
                ) : (
                    <AIChat 
                        chat={schedule?.chat} 
                        schedule={schedule} 
                        onScheduleEdit={onScheduleEdit}
                        setIsLoading={setIsLoading}
                        isLoading={isLoading}
                        setSchedule={setSchedule}
                    />
                )}
            </CardContent>
        </div>
    );
}