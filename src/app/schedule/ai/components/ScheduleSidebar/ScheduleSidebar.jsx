'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CategoryDropdown } from './CategoryDropdown'
import { RoutinesSection } from './RoutinesSection'
import { GoalsSection } from './GoalsSection'
import { PreferencesSection } from './PreferencesSection'
import { MessageCircle, ListChecks, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"

function ScheduleDetails({ schedule, openSection, toggleSection }) {
    return (
        <div className="space-y-4">
            <PreferencesSection 
                preferences={schedule?.preferences} 
                isOpen={openSection === 'preferences'}
                onToggle={() => toggleSection('preferences')}
            />
            <GoalsSection 
                goals={schedule?.goals} 
                isOpen={openSection === 'goals'}
                onToggle={() => toggleSection('goals')}
            />
            <RoutinesSection 
                routines={schedule?.routines} 
                isOpen={openSection === 'routines'}
                onToggle={() => toggleSection('routines')}
            />
            <CategoryDropdown schedule={schedule} />
        </div>
    )
}

function AIChat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newMessage = {
            id: Date.now(),
            text: message,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setLoading(true);
        try {
            setMessages(prev => [...prev, newMessage]);
            console.log('Sending message:', message);
            setMessage('');
        } catch (error) {
            console.error('Failed to send message:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-14rem)]">
            <div className="overflow-y-auto flex-grow px-2">
                {messages.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 text-sm text-gray-500 text-start"
                    >
                        Chat with AI to modify your schedule
                    </motion.div>
                ) : (
                    <div className="flex flex-col gap-3 py-4">
                        <AnimatePresence mode="popLayout">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, scale: 0.8, x: 100 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, x: 100 }}
                                    transition={{ 
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 20
                                    }}
                                    className="flex flex-col gap-1 ml-auto max-w-[85%]"
                                >
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-2xl rounded-tr-sm"
                                    >
                                        <p className="text-sm">{msg.text}</p>
                                        <span className="text-xs text-blue-100 self-end">
                                            {msg.timestamp}
                                        </span>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
            <motion.form 
                onSubmit={handleSendMessage} 
                className="p-4 border-t backdrop-blur-sm bg-white/50"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                <div className="flex gap-2">
                    <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask AI to modify your schedule..."
                        className="flex-grow text-sm rounded-md border-gray-300"
                        disabled={loading}
                    />
                    <Button 
                        type="submit" 
                        size="icon"
                        disabled={loading || !message.trim()}
                        className={`transition-all duration-200 ${
                            message.trim() 
                                ? 'bg-blue-500 hover:bg-blue-600' 
                                : 'bg-gray-300 cursor-not-allowed'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </motion.form>
        </div>
    )
}

export function ScheduleSidebar({ schedule }) {
    const [openSection, setOpenSection] = useState(null)
    const [activeView, setActiveView] = useState("details")
    console.log("🚀 ~ file: ScheduleSidebar.jsx:93 ~ activeView:", activeView)

    const toggleSection = (sectionName) => {
        setOpenSection(openSection === sectionName ? null : sectionName)
    }

    return (
        <Card className="relative overflow-x-hidden overflow-y-auto mx-auto w-[20em] pt-16 max-w-md bg-transparent hidden md:block h-full">
            <CardHeader className="flex flex-col gap-1.5 pt-0 pb-6 md:pb-8 space-y-0">
                <CardTitle className="text-lg font-semibold text-black">
                    Schedule Details
                </CardTitle>
                <CardDescription className="mt-0 text-sm font-medium text-gray-600 dark:text-gray-300">
                    {activeView === "chat" ? "Ask AI to modify your schedule" : "View your preferences and tasks"}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="grid grid-cols-[50%_50%] gap-1 p-2 mx-4 mb-4 rounded-lg backdrop-blur-sm bg-gray-100/80">
                    <button
                        onClick={() => setActiveView("details")}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                            activeView === "details"
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-600 hover:bg-white/50"
                        }`}
                    >
                        <ListChecks className="w-4 h-4" />
                        Details
                    </button>
                    <button
                        onClick={() => setActiveView("chat")}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                            activeView === "chat"
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-600 hover:bg-white/50"
                        }`}
                    >
                        <MessageCircle className="w-4 h-4" />
                        AI Chat
                    </button>
                </div>
                <div className="px-4">
                    {activeView === "details" ? (
                        <ScheduleDetails 
                            schedule={schedule}
                            openSection={openSection}
                            toggleSection={toggleSection}
                        />
                    ) : (
                        <AIChat />
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
