'use client'

import { HomepagePromptInput } from "@/components/custom/HomepageChat/HomepagePromptInput"
import { RootState } from "@/types/user.types"
import { ClipboardList, FileText, Image, Lightbulb, PenLine } from "lucide-react"
import { useState } from "react"
import { useSelector } from "react-redux"

const quickActions = [
    { id: "create-image", label: "Create image", icon: Image },
    { id: "make-plan", label: "Make a plan", icon: ClipboardList },
    { id: "summarize-text", label: "Summarize text", icon: FileText },
    { id: "help-write", label: "Help me write", icon: PenLine },
    { id: "brainstorm", label: "Brainstorm", icon: Lightbulb },
]

export default function HomepageChat() {
    const [input, setInput] = useState(null)
    const user = useSelector((state: RootState) => state.userModule.user)

    return <div className="w-full h-full flex flex-col justify-center items-center bg-white text-black">
        <div className="w-full max-w-2xl flex flex-col items-center gap-4">
            <div className="flex flex-col items-center text-black">
                <h1 className="text-3xl font-bold">Good evening, <span className="capitalize">{user.name}</span></h1>
                <p className="text-lg text-gray-400">How can I help you?</p>
            </div>
            <HomepagePromptInput setInput={setInput} input={input} />
            <div className="flex flex-row items-center justify-between w-full">
                {quickActions.map(action => (
                <button key={action.id} className="rounded-full flex flex-row gap-1 text-gray-600 items-center justify-center bg-gray-100 px-2 py-1.5 text-xs text-start whitespace-nowrap">
                    <action.icon className="w-4 h-4" />
                    {action.label}
                </button>
                ))}
            </div>
        </div>
    </div>
}