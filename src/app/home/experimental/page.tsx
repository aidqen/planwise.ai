'use client'

import { HomepagePromptInput } from "@/components/custom/HomepageChat/HomepagePromptInput"
import { RootState } from "@/types/user.types"
import { CalendarClock, CalendarRange, ClipboardList, FileText, Image, Lightbulb, ListChecks, Palette, PenLine, Settings } from "lucide-react"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { motion } from 'framer-motion'
import { AppearanceModal } from '@/components/AppearanceModal'
import { IconMessageCircle } from "@tabler/icons-react"
import { RecentChats } from "@/components/custom/HomepageChat/RecentChats"
import { useRouter } from "next/navigation"

const quickActions = [
    { id: "plan-day", label: "Plan my day", icon: CalendarRange },
    { id: "prioritize", label: "Prioritize tasks", icon: ListChecks },
    { id: "optimize-focus", label: "Optimize Routines", icon: CalendarClock },
    { id: "help-write", label: "Import from Google", icon: PenLine },
    { id: "brainstorm", label: "Brainstorm", icon: Lightbulb },
]

export default function HomepageChat() {
    const [input, setInput] = useState('')
    const [isAppearanceModalOpen, setIsAppearanceModalOpen] = useState(false)
    const [showRecentChats, setShowRecentChats] = useState(false)
    const router = useRouter()
    const user = useSelector((state: RootState) => state.userModule.user)
    console.log("🚀 ~ HomepageChat ~ user:", user)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowRecentChats(true)
        }, 850) 

        return () => clearTimeout(timer)
    }, [])

    const handleAppearanceSave = (settings: any) => {
        console.log('Appearance settings saved:', settings)
    }

    return <div className="relative w-full h-full flex flex-col justify-center items-center dark:bg-[#161618] bg-white text-black">
        <HomepageHeader onAppearanceClick={() => setIsAppearanceModalOpen(true)} />

        <div className="w-full max-w-[680px] mt-[100px] flex flex-col items-center gap-2">
            <div className="flex flex-col items-center text-black">
                <h1 className="text-3xl font-semibold tracking-tight">Good evening, <span className="capitalize">{user?.name ? user?.name.split(' ')[0] : 'user'}</span></h1>
                <p className="text-lg text-gray-500">How can I help you?</p>
            </div>
            <HomepagePromptInput setInput={setInput} input={input} />
            <div className="flex flex-row items-center justify-between w-full mt-4">
                {quickActions.map((action, index: number) => (
                    <motion.button
                        key={action.id}
                        initial={{ y: '50%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: 'spring', bounce: 0, damping: 35, mass: 1, stiffness: 300, delay: 0.4 + 0.1 * index, duration: '100ms' }}
                        className="rounded-full flex flex-row gap-1 text-gray-600 items-center justify-center bg-gray-100 px-2 py-1.5 text-xs text-start whitespace-nowrap">
                        <action.icon className="w-4 h-4" />
                        {action.label}
                    </motion.button>
                ))}
            </div>

            <RecentChats showRecentChats={showRecentChats} />
        </div>

        <AppearanceModal
            isOpen={isAppearanceModalOpen}
            onClose={() => setIsAppearanceModalOpen(false)}
            onSave={handleAppearanceSave}
        />
    </div>
}

function HomepageHeader({ onAppearanceClick }: { onAppearanceClick: () => void }) {

    return (
        <div className="w-full absolute flex flex-row gap-4 items-center justify-end px-4 top-0 h-10">
            <button
                onClick={onAppearanceClick}
                className="px-2 h-7 flex flex-row items-center gap-1 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded-lg text-[0.8rem] text-gray-600 "
            >
                <Palette className="h-4 w-4" />
                Appearance
            </button>
            <button className="rounded-md h-7 w-7 flex justify-center items-center cursor-pointer hover:bg-gray-200 transition-color duration-200">
                <Settings className="h-5 w-5 text-gray-600" />
            </button>
        </div>
    )
}