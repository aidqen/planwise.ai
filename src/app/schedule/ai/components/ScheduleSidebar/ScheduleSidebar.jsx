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

export function ScheduleSidebar({ schedule, setSchedule, onScheduleEdit, setIsLoading, isLoading, multiStepForm, isEditedSchedule }) {
    const [openSection, setOpenSection] = useState(null)
    const [activeView, setActiveView] = useState("details")
    const scheduleToShow = isLoading ? multiStepForm : schedule
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
        <>
            <CardHeader className="flex flex-col gap-1.5 pt-0 pb-6 md:pb-8 space-y-0 ">
                <CardTitle className="text-lg font-semibold text-black dark:text-white">
                    Schedule Details
                </CardTitle>
                <CardDescription className="mt-0 text-sm font-medium text-gray-600 dark:text-gray-300">
                    {activeView === "chat" ? "Ask AI to modify your schedule" : "View your preferences and tasks"}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="grid grid-cols-[50%_50%] gap-1 p-2 mx-5 mb-4 rounded-lg backdrop-blur-sm bg-gray-100/80">
                    {views.map(view => (
                        <button
                            key={view.id}
                            onClick={() => setActiveView(view.id)}
                            className={`flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                                activeView === view.id
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-600 hover:bg-white/50"
                            }`}
                        >
                            {view.icon}
                            {view.label}
                        </button>
                    ))}
                </div>
                <div className="overflow-hidden h-[calc(100vh-16rem)] md:h-[calc(100vh-16rem)] max-h-[60vh] md:max-h-none">
                    {activeView === "details" ? (
                        <ScheduleDetails
                            schedule={scheduleToShow}
                            openSection={openSection}
                            toggleSection={toggleSection}
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
                </div>
            </CardContent>
        </>
    )

    return (
        <>
            {/* Desktop Sidebar */}
            {!isMobile && (
                <Card className="overflow-y-auto overflow-x-hidden relative px-0 pt-16 mx-auto max-w-md h-full min-h-screen max-h-screen bg-transparent transition-all duration-200 w-[25em]"
                    style={{ width: '40em' }}>
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
                                className="fixed bottom-0 left-0 right-0 z-[80] bg-white dark:bg-neutral-900 rounded-t-[20px] overflow-hidden shadow-xl flex flex-col"
                                style={{ height: "85vh" }}
                            >
                                <div className="flex-shrink-0 sticky top-0 bg-white dark:bg-neutral-900 z-10 pb-2">
                                    <div className="mx-auto w-12 h-1.5 bg-gray-300 rounded-full my-3" />
                                    <button
                                        onClick={() => dispatch({ type: TOGGLE_SCHEDULE_SIDEBAR, isOpen: false })}
                                        className="absolute top-2 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="flex-1 overflow-hidden">
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
