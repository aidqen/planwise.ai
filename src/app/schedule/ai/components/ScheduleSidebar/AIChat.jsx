import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { scheduleService } from "@/services/scheduleService";
import { makeId } from "@/services/util.service";
import { AnimatePresence, motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function AIChat({ chat, schedule }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(chat);
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
        const newMessage = createNewMessage(message);
        setLoading(true);
        try {
            setMessages(prev => prev?.length ? [...prev, newMessage] : [newMessage]);
            setMessage('');
            await handleAIResponse(message);
        } catch (error) {
            console.error('Failed to send message:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAIResponse = async (userMessage) => {
        try {
            const { stream, decoder } = await scheduleService.streamScheduleChanges(userMessage, schedule);
            let aiResponse = '';

            // Create initial AI message
            const initialAiMessage = createAIMessage('');
            setMessages(prev => [...prev, initialAiMessage]);

            while (true) {
                const { done, value } = await stream.read();
                if (done) break;
                
                const text = decoder.decode(value);
                aiResponse += text;
                
                // Update the AI message in the messages array
                setMessages(prev => prev.map(msg => 
                    msg.id === initialAiMessage.id 
                        ? { ...msg, text: aiResponse }
                        : msg
                ));
            }

            // Save the updated chat
            await scheduleService.saveChat(schedule._id, messages);
        } catch (error) {
            console.error('Failed to get AI response:', error);
        }
    };

    function createNewMessage(text) {
        return {
            id: makeId(10),
            type: 'user',
            text: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
    }

    function createAIMessage(text) {
        return {
            id: makeId(10),
            type: 'ai',
            text
        };
    }

    const MessageBubble = ({ message }) => {
        const isUser = message.type === 'user';
        return (
            <motion.div
                initial={false}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: isUser ? 100 : -100 }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                }}
                className={`flex flex-col gap-1 max-w-[85%] ${isUser ? 'ml-auto' : 'mr-auto'}`}
            >
                <motion.div
                    initial={false}
                    animate={{ opacity: 1 }}
                    className={`px-4 py-2 ${
                        isUser 
                            ? 'bg-blue-500 text-white rounded-2xl rounded-tr-sm'
                            : 'bg-gray-100 text-gray-800 rounded-xl'
                    }`}
                >
                    {isUser ? (
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    ) : (
                        <div className="markdown-content text-sm">
                            <ReactMarkdown 
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                    ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
                                    ol: ({ children }) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
                                    li: ({ children }) => <li className="mb-1">{children}</li>,
                                    code: ({ inline, children }) => 
                                        inline 
                                            ? <code className="bg-gray-200 px-1 rounded">{children}</code>
                                            : <pre className="bg-gray-800 text-white p-2 rounded my-2 overflow-x-auto">
                                                <code>{children}</code>
                                              </pre>,
                                    blockquote: ({ children }) => 
                                        <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2">
                                            {children}
                                        </blockquote>,
                                }}
                            >
                                {message.text}
                            </ReactMarkdown>
                        </div>
                    )}
                    {isUser && (
                        <span className="text-xs text-blue-100 self-end">
                            {message.timestamp}
                        </span>
                    )}
                </motion.div>
            </motion.div>
        );
    };

    return (
        <div className="flex flex-col h-[calc(100vh-15.5rem)] overflow-hidden">
            <div className={cn(messages?.length === 0 ? "overflow-y-hidden" : "overflow-y-auto", "scrollbar overflow-x-hidden flex-grow px-2")}>
                {messages?.length === 0 ? (
                    <motion.div
                        initial={false}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 text-sm text-gray-500 text-start"
                    >
                        Chat with AI to modify your schedule
                    </motion.div>
                ) : (
                    <div className="flex flex-col gap-3 py-4 overflow-y-hidden overflow-x-hidden">
                        <AnimatePresence 
                            mode="popLayout" 
                            initial={false}
                            presenceAffectsLayout
                        >
                            {messages?.map((msg) => (
                                <MessageBubble key={msg.id} message={msg} />
                            ))}
                        </AnimatePresence>
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>
            <motion.form
                onSubmit={handleSendMessage}
                className="relative p-4 border-t backdrop-blur-sm bg-white/50 mt-auto"
                initial={false}
                animate={{ opacity: 1 }}
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
    );
}
