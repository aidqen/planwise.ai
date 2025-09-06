import { cn } from "@/lib/utils";
import { scheduleService } from "@/services/scheduleService";
import { makeId } from "@/services/util.service";
import { TOGGLE_SCHEDULE_SIDEBAR } from "@/store/reducers/system.reducer";
import { useChat } from "@ai-sdk/react";
import { useState, useRef, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { MessageBubble } from "@/components/AIChat/MessageBubble";
import { DefaultChatTransport } from "ai";
import { ChatInput } from "../ChatInput";
import { toDB, fromDB, convertMessagesToUIFormat } from "@/utils/message-utils";
import { ToolCallIndication } from "./ToolCallIndication";

export function AIChat({ chat, schedule, setSchedule, onScheduleEdit, isLoading, setIsLoading }) {
    console.log("🚀 ~ AIChat ~ schedule:", schedule)
    const dispatch = useDispatch()
    const messagesEndRef = useRef(null);
    const [input, setInput] = useState('');
    const [activeToolName, setActiveToolName] = useState(null);

    const { messages, status, stop, sendMessage, setMessages, error } = useChat({
        transport: new DefaultChatTransport({
            api: '/api/experimental-ai/chat',
            body: { schedule: schedule.schedule },
            credentials: 'include',
        }),
        async onToolCall({ toolCall }) {
            console.log("🚀 ~ onToolCall ~ toolCall:", toolCall)
            if (toolCall.toolName === 'editSchedule') {
                setIsLoading(true);
                dispatch({ type: TOGGLE_SCHEDULE_SIDEBAR, isOpen: false })
            }
            // Set the active tool name
            setActiveToolName(toolCall.toolName)
        },
        onFinish: () => {
            setIsLoading(false);
            setActiveToolName(null)
        }
    })

    const dbMessages = useMemo(() => {
        return messages.map(msg => {
            if (msg?.parts?.length > 0) {
                return toDB(msg)
            }
            return msg
        });
    }, [messages]);

    useEffect(() => {
        if (chat && Array.isArray(chat) && chat.length > 0) {
            const formattedMessages = convertMessagesToUIFormat(chat);
            setMessages(formattedMessages);
        }
    }, [chat, setMessages]);

    useEffect(() => {
        // saveChat()
        // scrollToBottom();
        if (messages.length > 0) {
            const latestMessage = messages[messages.length - 1];
            handleToolOutputs(latestMessage);
        }
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    function addMessageToChat(message) {
        setMessages(msgs => [...msgs, message])
    }

    async function saveChat() {
        if (schedule?._id && dbMessages?.length) {
            await scheduleService.saveChat(schedule._id, dbMessages);
        }
    }

    const handleToolOutputs = (message) => {
        if (!message?.parts || !Array.isArray(message.parts)) return;

        const editSchedulePart = message.parts.find(part => part.type === 'tool-editSchedule');
        if (editSchedulePart && editSchedulePart.output) {
            handleScheduleEdit(editSchedulePart.output);
        }
    }

    const handleScheduleEdit = (editedSchedule) => {
        if (!editedSchedule) return;

        try {
            const updatedSchedule = {
                ...schedule,
                schedule: editedSchedule,
            };
            onScheduleEdit(updatedSchedule);
        } catch (error) {
            console.error('Failed to edit schedule:', error);
            const errorMessage = createAIMessage('Failed to apply schedule changes. Please try again.');
            addMessageToChat(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    function createAIMessage(text) {
        return {
            id: makeId(10),
            role: 'assistant',
            parts: [{ type: 'text', text: text }],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    }

    function handleFormSubmit(e) {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;

        sendMessage({ text: input });
        setInput('');
    }


    return (
        <div className="flex flex-col h-full">
            <div className="relative overflow-y-auto flex-1 px-2 scrollbar">
                {messages?.length === 0 ? (
                    <div
                        className="p-4 text-sm text-gray-500 opacity-100 transition-all duration-300 ease-out transform translate-y-0 dark:text-gray-400 text-start"
                    >
                        Chat with AI to modify your schedule
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 py-4">
                        {messages?.map((msg) => (
                            <MessageBubble key={msg.id} message={msg} type="regular" />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}
                <ToolCallIndication toolName={activeToolName} />
            </div>
            <ChatInput
                input={input}
                setInput={setInput}
                handleSubmit={handleFormSubmit}
                status={status}
                stop={stop}
                isLoading={isLoading}
                error={error}
            />
        </div>
    );
}
