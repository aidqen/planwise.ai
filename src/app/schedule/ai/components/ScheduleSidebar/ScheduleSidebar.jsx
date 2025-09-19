'use client'

import { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { SidebarContent } from './SidebarContent'
import { Drawer } from 'vaul'
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

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') dispatch({ type: TOGGLE_SCHEDULE_SIDEBAR, isOpen: false })
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [dispatch])

    return (
        <>
            {/* Desktop Sidebar */}
            {!isMobile && (
                <Card className="flex flex-col overflow-hidden relative h-screen pt-4 md:pt-16 max-h-screen bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-0 transition-all duration-200 xl:w-[30em] md:w-[20em] lg:w-[28em]  dark:border-gray-800">
                    <SidebarContent
                        schedule={schedule}
                        setSchedule={setSchedule}
                        onScheduleEdit={onScheduleEdit}
                        setIsLoading={setIsLoading}
                        isLoading={isLoading}
                        onSaveSchedule={onSaveSchedule}
                        openSection={openSection}
                        toggleSection={toggleSection}
                        activeView={activeView}
                        setActiveView={setActiveView}
                    />
                </Card>
            )}

            {/* Mobile Sidebar with Vaul */}
            {isMobile && (
                <Drawer.Root 
                    open={isOpen} 
                    onOpenChange={(open) => dispatch({ type: TOGGLE_SCHEDULE_SIDEBAR, isOpen: open })}
                    transitionDuration={150}
                >
                    <Drawer.Portal>
                        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[75]" />
                        <Drawer.Content className="bg-white dark:bg-gray-900 flex flex-col rounded-t-[20px] h-[95vh] mt-24 fixed bottom-0 left-0 right-0 z-[80] outline-none">
                            <div className="p-2 bg-white dark:bg-gray-900 rounded-t-[20px] flex-1 overflow-hidden">
                                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 dark:bg-gray-700 mb-4" />
                                <div className="h-full overflow-hidden">
                                    <SidebarContent
                                        schedule={schedule}
                                        setSchedule={setSchedule}
                                        onScheduleEdit={onScheduleEdit}
                                        setIsLoading={setIsLoading}
                                        isLoading={isLoading}
                                        onSaveSchedule={onSaveSchedule}
                                        openSection={openSection}
                                        toggleSection={toggleSection}
                                        activeView={activeView}
                                        setActiveView={setActiveView}
                                    />
                                </div>
                            </div>
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>
            )}
        </>
    )
}
