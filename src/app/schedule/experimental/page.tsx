import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

export default function ExperimentalChat() {
    const { messages, status, stop, sendMessage, setMessages, error } = useChat({
        transport: new DefaultChatTransport({
            api: '/api/experimental-ai/chat',
            // body: () => ({ schedule: schedule.schedule }),
            credentials: 'same-origin',
        }),
        async onToolCall({ toolCall }) {
            console.log("🚀 ~ onToolCall ~ toolCall:", toolCall)
            if (toolCall.toolName === 'editSchedule') {
                // setIsLoading(true);
                // dispatch({ type: TOGGLE_SCHEDULE_SIDEBAR, isOpen: false })
            }
            // setActiveToolName(toolCall.toolName)
        },
        onFinish: () => {
            // setIsLoading(false);
            // setActiveToolName(null)
        }
    })

    return (

    )
}