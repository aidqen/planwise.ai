import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function AIChat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        adjustTextareaHeight();
    }, [message]);

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
        <div className="flex flex-col h-[calc(100vh-15.5rem)] overflow-hidden">
            <div className={cn(messages.length === 0 ? "overflow-y-hidden" : "overflow-y-auto","scrollbar overflow-x-hidden flex-grow px-2")}>
                {messages.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 text-sm text-gray-500 text-start"
                    >
                        Chat with AI to modify your schedule
                    </motion.div>
                ) : (
                    <div className="flex flex-col gap-3 py-4  overflow-y-hidden overflow-x-hidden">
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
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>
            <motion.form 
                onSubmit={handleSendMessage} 
                className="relative p-4 border-t backdrop-blur-sm bg-white/50 mt-auto"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                <div className="flex gap-2 items-end">
                    <Textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask AI to modify your schedule..."
                        className="flex-grow text-sm rounded-md border-gray-300 max-h-[20rem] min-h-[40px] px-3 py-2.5 transition-all duration-200 resize-none"
                        style={{ height: 'auto', overflow: 'hidden' }}
                        disabled={loading}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage(e);
                            }
                        }}
                        rows={1}
                    />
                    <Button 
                        type="submit" 
                        size="icon"
                        disabled={loading || !message.trim()}
                        className={`transition-all duration-200 h-10 w-10 shrink-0 text-white ${
                            message.trim() 
                                ? 'bg-blue-500 hover:bg-blue-600' 
                                : 'bg-gray-300 cursor-not-allowed'
                        }`}
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </motion.form>
        </div>
    )
}
