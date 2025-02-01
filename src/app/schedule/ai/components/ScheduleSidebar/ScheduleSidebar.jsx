'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, ListChecks, X } from "lucide-react"
import { ScheduleDetails } from './ScheduleDetails'
import { AIChat } from './AIChat'
import { AnimatePresence, motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { TOGGLE_SCHEDULE_SIDEBAR } from '@/store/reducers/system.reducer'
import { useIsMobile } from '@/hooks/useMediaQuery'

export function ScheduleSidebar({ schedule, setSchedule, onScheduleEdit, setIsLoading, isLoading, onSaveSchedule }) {
    const [openSection, setOpenSection] = useState(null)
    const [activeView, setActiveView] = useState("chat")
    const isOpen = useSelector(state => state.systemModule.isScheduleSidebarOpen)
    const isMobile = useIsMobile()
    const dispatch = useDispatch()

    const toggleSection = (sectionName) => {
        setOpenSection(openSection === sectionName ? null : sectionName)
    }

    // Close mobile sidebar when pressing escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') dispatch({ type: TOGGLE_SCHEDULE_SIDEBAR, isOpen: false })
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [dispatch])

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

    const sidebarContent = (
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
    )

    return (
        <>
            {/* Desktop Sidebar */}
            {!isMobile && (
                <Card className="flex flex-col overflow-hidden relative h-screen pt-4 md:pt-16 max-h-screen bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-all duration-200 w-[350px] border-r border-gray-200 xl:w-[25em] md:w-[20em] lg:w-[22em]  dark:border-gray-800">
                    {sidebarContent}
                </Card>
            )}

            {/* Mobile Sidebar */}
            {isMobile && (
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black z-[75]"
                                onClick={() => dispatch({ type: TOGGLE_SCHEDULE_SIDEBAR, isOpen: false })}
                            />
                            
                            {/* Bottom Sheet */}
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="fixed bottom-0 left-0 right-0 z-[80] bg-white dark:bg-gray-900 rounded-t-[20px] overflow-hidden shadow-xl dark:shadow-black/20 flex flex-col"
                                style={{ height: "95vh" }}
                            >
                                <div className="sticky top-0 z-10 flex-shrink-0 pb-2 bg-white dark:bg-gray-900">
                                    <div className="mx-auto w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full my-3" />
                                    <button
                                        onClick={() => dispatch({ type: TOGGLE_SCHEDULE_SIDEBAR, isOpen: false })}
                                        className="absolute top-2 right-4 p-2 text-gray-600 rounded-full dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="overflow-hidden flex-1">
                                    {sidebarContent}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            )}
        </>
    )
}
