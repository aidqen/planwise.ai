import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { scheduleService } from "@/services/scheduleService";
import { makeId } from "@/services/util.service";
import { TOGGLE_SCHEDULE_SIDEBAR } from "@/store/reducers/system.reducer";
import { Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from 'react-markdown';
import { useDispatch } from "react-redux";
import remarkGfm from 'remark-gfm';

export function AIChat({ chat, schedule, setSchedule, onScheduleEdit, isLoading, setIsLoading }) {
    const dispatch = useDispatch()
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null);
    const [streamingMessage, setStreamingMessage] = useState(null)
    const textareaRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    };

    useEffect(() => {
        saveChat()
        scrollToBottom();
    }, [chat]);

    useEffect(() => {
        adjustTextareaHeight();
    }, [message]);

    function addMessageToChat(message) {
        setSchedule(schedule => ({
            ...schedule,
            chat: schedule?.chat ? [...schedule.chat, message] : [message]
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

    async function saveChat() {
        if (schedule?._id && Array.isArray(chat)) {
            await scheduleService.saveChat(schedule._id, chat);
        }
    }
    const handleAIResponse = async (userMessage) => {
        try {
            const minimalSchedule = {
                _id: schedule._id,
                preferences: schedule.preferences,
                schedule: schedule.schedule,
                routines: schedule.routines,
                goals: schedule.goals
            };

            const lastMessages = (schedule.chat || [])
                .slice(-5)
                .map(msg => ({
                    role: msg.type === 'user' ? 'user' : 'assistant',
                    content: msg.text
                }));

            const { stream, decoder } = await scheduleService.streamScheduleChanges(
                userMessage,
                minimalSchedule,
                lastMessages
            );
            setStreamingMessage('');
            let aiResponse = '';
            let messageType = null;


            while (true) {
                const { done, value } = await stream.read();
                if (done) break;

                const text = decoder.decode(value);

                if (text.startsWith('[TYPE:')) {
                    messageType = text.match(/\[TYPE:(.*?)\]/)[1];
                    continue;
                }

                aiResponse += text;
                setStreamingMessage(aiResponse);
                scrollToBottom();
            }

            // After streaming is complete, create and add the message to chat
            if (aiResponse) {
                const finalAiMessage = createAIMessage(aiResponse);
                addMessageToChat(finalAiMessage);
                setStreamingMessage(null);
            }

            if (messageType === 'schedule_edit') {
                // First set loading and close sidebar
                setIsLoading(true);
                dispatch({ type: TOGGLE_SCHEDULE_SIDEBAR, isOpen: false });

                try {
                    const editedScheduleResponse = await scheduleService.getEditedSchedule(minimalSchedule, aiResponse);
                    if (editedScheduleResponse) {
                        // Create a new schedule object with the edited data
                        const updatedSchedule = {
                            ...schedule,
                            ...editedScheduleResponse,
                            // chat: schedule.chat // Preserve the chat history
                        };
                        onScheduleEdit(updatedSchedule);
                    }
                } catch (error) {
                    console.error('Failed to edit schedule:', error);
                    addMessageToChat(createAIMessage('Failed to apply schedule changes. Please try again.'));
                }
            }
        } catch (error) {
            console.error('Failed to get AI response:', error);
            addMessageToChat(createAIMessage('Sorry, I encountered an error. Please try again.'));
        } finally {
            setIsLoading(false);
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

    const MessageBubble = ({ message, type = 'regular' }) => {
        const isUser = type === 'regular' ? message.type === 'user' : false;
        const messageText = type === 'regular' ? message.text : message;
        
        return (
            <div
                className={`flex flex-col gap-1 max-w-[85%] transition-all duration-300 ease-out transform ${isUser ? 'ml-auto translate-x-0 opacity-100' : 'mr-auto translate-x-0 opacity-100'}`}
            >
                <div
                    className={`px-4 py-2 transition-opacity duration-300 ${isUser
                        ? 'text-white bg-blue-500 rounded-2xl rounded-tr-sm dark:bg-blue-600'
                        : 'text-gray-800 bg-gray-100 rounded-xl dark:text-gray-100 dark:bg-gray-800'
                        } ${type === 'streaming' ? 'border-l-4 border-blue-500 dark:border-blue-400' : ''}`}
                >
                    {isUser ? (
                        <p className="text-xs whitespace-pre-wrap max-sm:text-sm lg:text-sm">{messageText}</p>
                    ) : (
                        <div className="text-xs max-sm:text-sm lg:text-sm markdown-content">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                    ul: ({ children }) => <ul className="mb-2 ml-4 list-disc">{children}</ul>,
                                    ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal">{children}</ol>,
                                    li: ({ children }) => <li className="mb-1">{children}</li>,
                                    code: ({ inline, children }) =>
                                        inline
                                            ? <code className="px-1 text-gray-800 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-200">{children}</code>
                                            : <pre className="overflow-x-auto p-2 my-2 text-white bg-gray-800 rounded dark:bg-gray-900">
                                                <code>{children}</code>
                                            </pre>,
                                    blockquote: ({ children }) =>
                                        <blockquote className="pl-4 my-2 italic border-l-4 border-gray-300 dark:border-gray-600">
                                            {children}
                                        </blockquote>,
                                }}
                            >
                                {messageText}
                            </ReactMarkdown>
                            {type === 'streaming' && (
                                <div className="flex gap-1 items-center mt-1 text-blue-500 dark:text-blue-400">
                                    <div className="w-1 h-1 bg-current rounded-full animate-pulse"></div>
                                    <div className="w-1 h-1 bg-current rounded-full delay-75 animate-pulse"></div>
                                    <div className="w-1 h-1 bg-current rounded-full delay-150 animate-pulse"></div>
                                </div>
                            )}
                        </div>
                    )}
                    {isUser && type === 'regular' && (
                        <span className="self-end text-xs text-blue-100">
                            {message.timestamp}
                        </span>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full">
            <div className="overflow-y-auto flex-1 px-2 scrollbar">
                {!chat?.length ? (
                    <div
                        className="p-4 text-sm text-gray-500 opacity-100 transition-all duration-300 ease-out transform translate-y-0 dark:text-gray-400 text-start"
                    >
                        Chat with AI to modify your schedule
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 py-4">
                        {chat?.map((msg) => (
                            <MessageBubble key={msg.id} message={msg} type="regular" />
                        ))}
                        {streamingMessage && (
                            <MessageBubble key="streaming" message={streamingMessage} type="streaming" />
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>
            <form
                onSubmit={handleSendMessage}
                className="sticky bottom-0 p-4 mt-auto border-t border-gray-200 backdrop-blur-sm transition-opacity duration-300 bg-white/50 dark:bg-gray-900/50 dark:border-gray-700"
            >
                <div className="flex gap-2 items-end">
                    <Textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask AI to modify your schedule..."
                        className="flex-grow md:text-xs lg:text-sm text-sm rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 max-h-[20rem] min-h-[40px] px-3 py-2.5 transition-all duration-200 resize-none focus:border-blue-500 dark:focus:border-blue-400"
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
                            ? 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                            : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                            }`}
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </form>
        </div>
    );
}
