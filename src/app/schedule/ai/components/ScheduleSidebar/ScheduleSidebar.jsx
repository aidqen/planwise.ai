'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, ListChecks } from "lucide-react"
import { ScheduleDetails } from './ScheduleDetails'
import { AIChat } from './AIChat'



export function ScheduleSidebar({ schedule, setSchedule, onScheduleEdit, setIsLoading, isLoading, multiStepForm }) {
    const [openSection, setOpenSection] = useState(null)
    const [activeView, setActiveView] = useState("details")
    const scheduleToShow = isLoading ? multiStepForm : schedule

    const toggleSection = (sectionName) => {
        setOpenSection(openSection === sectionName ? null : sectionName)
    }

    return (
        <Card className={"hidden overflow-y-auto overflow-x-hidden relative px-0 pt-16 mx-auto max-w-md h-full min-h-screen max-h-screen bg-transparent transition-all duration-200 w-[25em] md:block"}
            style={{ width: '40em' }}>
            <CardHeader className="flex flex-col gap-1.5 pt-0 pb-6 md:pb-8 space-y-0">
                <CardTitle className="text-lg font-semibold text-black">
                    Schedule Details
                </CardTitle>
                <CardDescription className="mt-0 text-sm font-medium text-gray-600 dark:text-gray-300">
                    {activeView === "chat" ? "Ask AI to modify your schedule" : "View your preferences and tasks"}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="grid grid-cols-[50%_50%] gap-1 p-2 mx-5 mb-4 rounded-lg backdrop-blur-sm bg-gray-100/80">
                    <button
                        onClick={() => setActiveView("details")}
                        className={`flex justify-center items-center gap-2  px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${activeView === "details"
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-600 hover:bg-white/50"
                            }`}
                    >
                        <ListChecks className="w-4 h-4" />
                        Details
                    </button>
                    <button
                        onClick={() => setActiveView("chat")}
                        className={`flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${activeView === "chat"
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-600 hover:bg-white/50"
                            }`}
                    >
                        <MessageCircle className="w-4 h-4" />
                        AI Chat
                    </button>
                </div>
                <div className=" overflow-hidden h-[calc(100vh-16rem)]">
                    {activeView === "details" ? (
                        <ScheduleDetails
                            schedule={scheduleToShow}
                            openSection={openSection}
                            toggleSection={toggleSection}
                        />
                    ) : (
                        <AIChat chat={schedule?.chat} schedule={schedule} onScheduleEdit={onScheduleEdit}
                        setIsLoading={setIsLoading}
                        isLoading={isLoading}
                        setSchedule={setSchedule}
                        />
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
