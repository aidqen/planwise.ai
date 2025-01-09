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

export function AIChat({ chat, schedule, setSchedule, onScheduleEdit, isLoading, setIsLoading }) {
    const [message, setMessage] = useState('');
    // const [messages, setMessages] = useState(chat || []);
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
    }, [chat]);

    useEffect(() => {
        adjustTextareaHeight();
    }, [message]);

    function addMessageToChat(message) {
        setSchedule(schedule => ({
            ...schedule,
            chat: [...(Array.isArray(schedule?.chat) ? schedule?.chat : []), message]
        }));
    }

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim() || isLoading) return;

        const newMessage = createNewMessage(message);

        try {
            addMessageToChat(newMessage)
            setMessage('');
            await handleAIResponse(message);
        } catch (error) {
            console.error('Failed to send message:', error);
        };
    }
    const handleAIResponse = async (userMessage) => {
        try {
            const { stream, decoder } = await scheduleService.streamScheduleChanges(userMessage, schedule);
            let aiResponse = '';
            let messageType = null;

            const initialAiMessage = createAIMessage('');
            addMessageToChat(initialAiMessage)

            while (true) {
                const { done, value } = await stream.read();
                if (done) break;

                const text = decoder.decode(value);

                // Check for message type in the first chunk
                if (text.startsWith('[TYPE:')) {
                    messageType = text.match(/\[TYPE:(.*?)\]/)[1];
                    continue;
                }

                aiResponse += text;

                setSchedule(prev => ({
                    ...prev,
                    chat: Array.isArray(prev.chat)
                        ? prev.chat.map(msg =>
                            msg.id === initialAiMessage.id
                                ? { ...msg, text: aiResponse }
                                : msg
                        )
                        : [initialAiMessage]
                }));
            }

            // Only get edited schedule if it's a schedule_edit message
            if (messageType === 'schedule_edit') {
                setIsLoading(true)
                const editedScheduleResponse = await scheduleService.getEditedSchedule(schedule, aiResponse);
                console.log("🚀 ~ file: AIChat.jsx:96 ~ editedScheduleResponse:", editedScheduleResponse)
                if (editedScheduleResponse) {
                    onScheduleEdit(editedScheduleResponse);
                }
                setIsLoading(false)
            }

            // Save the updated chat
            if (schedule?._id && Array.isArray(chat)) {
                await scheduleService.saveChat(schedule._id, chat);
            }
        } catch (error) {
            console.error('Failed to get AI response:', error);
            addMessageToChat(createAIMessage('Sorry, I encountered an error. Please try again.'));
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
                    className={`px-4 py-2 ${isUser
                        ? 'text-white bg-blue-500 rounded-2xl rounded-tr-sm'
                        : 'text-gray-800 bg-gray-100 rounded-xl'
                        }`}
                >
                    {isUser ? (
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    ) : (
                        <div className="text-sm markdown-content">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                    ul: ({ children }) => <ul className="mb-2 ml-4 list-disc">{children}</ul>,
                                    ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal">{children}</ol>,
                                    li: ({ children }) => <li className="mb-1">{children}</li>,
                                    code: ({ inline, children }) =>
                                        inline
                                            ? <code className="px-1 bg-gray-200 rounded">{children}</code>
                                            : <pre className="overflow-x-auto p-2 my-2 text-white bg-gray-800 rounded">
                                                <code>{children}</code>
                                            </pre>,
                                    blockquote: ({ children }) =>
                                        <blockquote className="pl-4 my-2 italic border-l-4 border-gray-300">
                                            {children}
                                        </blockquote>,
                                }}
                            >
                                {message.text}
                            </ReactMarkdown>
                        </div>
                    )}
                    {isUser && (
                        <span className="self-end text-xs text-blue-100">
                            {message.timestamp}
                        </span>
                    )}
                </motion.div>
            </motion.div>
        );
    };

    return (
        <div className="flex flex-col h-[calc(100vh-15.5rem)] overflow-hidden">
            <div className={cn(!chat?.length ? "overflow-y-hidden" : "overflow-y-auto", "scrollbar overflow-x-hidden flex-grow px-2")}>
                {!chat?.length ? (
                    <motion.div
                        initial={false}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 text-sm text-gray-500 text-start"
                    >
                        Chat with AI to modify your schedule
                    </motion.div>
                ) : (
                    <div className="flex overflow-x-hidden overflow-y-hidden flex-col gap-3 py-4">
                        <AnimatePresence
                            mode="popLayout"
                            initial={false}
                            presenceAffectsLayout
                        >
                            {chat?.map((msg) => (
                                <MessageBubble key={msg.id} message={msg} />
                            ))}
                        </AnimatePresence>
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>
            <motion.form
                onSubmit={handleSendMessage}
                className="relative p-4 mt-auto border-t backdrop-blur-sm bg-white/50"
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
                        disabled={isLoading}
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
                        disabled={isLoading || !message.trim()}
                        className={`transition-all duration-200 h-10 w-10 shrink-0 text-white ${message.trim()
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
