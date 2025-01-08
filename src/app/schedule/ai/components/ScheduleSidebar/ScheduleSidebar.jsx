'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, ListChecks } from "lucide-react"
import { ScheduleDetails } from './ScheduleDetails'
import { AIChat } from './AIChat'



export function ScheduleSidebar({ schedule, onScheduleEdit, setIsLoading, isLoading }) {
    const [openSection, setOpenSection] = useState(null)
    const [activeView, setActiveView] = useState("details")
    console.log("🚀 ~ file: ScheduleSidebar.jsx:15 ~ activeView:", activeView === 'chat')

    const toggleSection = (sectionName) => {
        setOpenSection(openSection === sectionName ? null : sectionName)
    }

    return (
        <Card className={"relative overflow-x-hidden overflow-y-auto mx-auto w-[25em] pt-16 px-0 max-w-md bg-transparent hidden md:block h-full transition-all duration-200"}
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
                            schedule={schedule}
                            openSection={openSection}
                            toggleSection={toggleSection}
                        />
                    ) : (
                        <AIChat chat={schedule?.chat} schedule={schedule} onScheduleEdit={onScheduleEdit}
                        setIsLoading={setIsLoading}
                        isLoading={isLoading}
                        />
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
