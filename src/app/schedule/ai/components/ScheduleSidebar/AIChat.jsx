import { cn } from "@/lib/utils";
import { scheduleService } from "@/services/scheduleService";
import { makeId } from "@/services/util.service";
import { TOGGLE_SCHEDULE_SIDEBAR } from "@/store/reducers/system.reducer";
import { useChat } from "@ai-sdk/react";
import { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch } from "react-redux";
import { MessageBubble } from "@/components/AIChat/MessageBubble";
import { DefaultChatTransport } from "ai";
import { ChatInput } from "./ChatInput";

// Convert UIMessage to database format
const toDB = (message) => ({
    id: message.id,
    type: message.role === 'user' ? 'user' : 'assistant',
    text: message.parts
        .filter(p => p.type === 'text')
        .map(p => p.text)
        .join(''),
    timestamp: message.metadata?.timestamp,
});

// Convert database format to UIMessage
const fromDB = (record) => ({
    id: record.id,
    role: record.type === 'user' ? 'user' : 'assistant',
    parts: [{ type: 'text', text: record.text }],
    metadata: { timestamp: record.timestamp }
});

// Convert an array of messages to UIMessage format
const convertMessagesToUIFormat = (messages) => {
    if (!messages || !Array.isArray(messages)) return [];
    return messages.map(msg => fromDB({
        id: msg.id || makeId(10),
        type: msg.type,
        text: msg.text,
        timestamp: msg.timestamp || new Date().toISOString()
    }));
};

export function AIChat({ chat, schedule, setSchedule, onScheduleEdit, isLoading, setIsLoading }) {
    const dispatch = useDispatch()
    const messagesEndRef = useRef(null);
    const [input, setInput] = useState('');
    const [streamingMessage, setStreamingMessage] = useState(null)
    
    const { messages, status, stop, sendMessage, setMessages, error } = useChat({
        transport: new DefaultChatTransport({
            api: '/api/experimental-ai/chat',
            body: { schedule: schedule.schedule },
            credentials: 'include',
        }),
        async onToolCall({ toolCall }) {
            if (toolCall.toolName === 'editSchedule') {
                setIsLoading(true);
                dispatch({ type: TOGGLE_SCHEDULE_SIDEBAR, isOpen: false })
            }
        },
        onFinish: () => {
            setIsLoading(false);
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

    // const dbMessages = messages

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

    // const handleAIResponse = async (userMessage) => {
    //     try {
    //         const minimalSchedule = {
    //             _id: schedule._id,
    //             preferences: schedule.preferences,
    //             schedule: schedule.schedule,
    //             routines: schedule.routines,
    //             goals: schedule.goals
    //         };

    //         const lastMessages = (schedule.chat || [])
    //             .slice(-5)
    //             .map(msg => ({
    //                 role: msg.type === 'user' ? 'user' : 'assistant',
    //                 content: msg.text
    //             }));

    //         const { stream, decoder } = await scheduleService.streamScheduleChanges(
    //             userMessage,
    //             minimalSchedule,
    //             lastMessages
    //         );
    //         setStreamingMessage('');
    //         let aiResponse = '';
    //         let messageType = null;


    //         while (true) {
    //             const { done, value } = await stream.read();
    //             if (done) break;

    //             const text = decoder.decode(value);

    //             if (text.startsWith('[TYPE:')) {
    //                 messageType = text.match(/\[TYPE:(.*?)\]/)[1];
    //                 continue;
    //             }

    //             aiResponse += text;
    //             setStreamingMessage(aiResponse);
    //             scrollToBottom();
    //         }

    //         // After streaming is complete, create and add the message to chat
    //         if (aiResponse) {
    //             const finalAiMessage = createAIMessage(aiResponse);
    //             addMessageToChat(finalAiMessage);
    //             setStreamingMessage(null);
    //         }

    //         if (messageType === 'schedule_edit') {
    //             // First set loading and close sidebar
    //             setIsLoading(true);
    //             dispatch({ type: TOGGLE_SCHEDULE_SIDEBAR, isOpen: false });

    //             try {
    //                 const editedScheduleResponse = await scheduleService.getEditedSchedule(minimalSchedule, aiResponse);
    //                 if (editedScheduleResponse) {
    //                     // Create a new schedule object with the edited data
    //                     const updatedSchedule = {
    //                         ...schedule,
    //                         ...editedScheduleResponse,
    //                         // chat: schedule.chat // Preserve the chat history
    //                     };
    //                     onScheduleEdit(updatedSchedule);
    //                 }
    //             } catch (error) {
    //                 console.error('Failed to edit schedule:', error);
    //                 addMessageToChat(createAIMessage('Failed to apply schedule changes. Please try again.'));
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Failed to get AI response:', error);
    //         addMessageToChat(createAIMessage('Sorry, I encountered an error. Please try again.'));
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };



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
            <div className="overflow-y-auto flex-1 px-2 scrollbar">
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
                        {streamingMessage && (
                            <MessageBubble key="streaming" message={streamingMessage} type="streaming" />
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                )}
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
