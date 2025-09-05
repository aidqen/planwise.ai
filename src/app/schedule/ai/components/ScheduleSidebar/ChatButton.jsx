import { Button } from "@/components/ui/button";
import { Send, Square } from "lucide-react";

export function ChatButton({ status, input, stop, isLoading }) {
    const isStreaming = status === 'streaming';
    const isError = status === 'error';
    const isDisabled = isLoading || (!input?.trim() && !isStreaming);
    
    // Determine button appearance based on status
    const getButtonClass = () => {
        if (isStreaming) {
            return "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700";
        }
        
        if (isError) {
            return "bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700";
        }
        
        return input?.trim()
            ? "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            : "bg-gray-300 dark:bg-gray-700 cursor-not-allowed";
    };
    
    return (
        <Button
            type={isStreaming ? "button" : "submit"}
            size="icon"
            disabled={isDisabled}
            onClick={isStreaming ? (e) => {
                e.preventDefault();
                stop();
            } : undefined}
            className={`transition-all duration-200 h-10 w-10 shrink-0 text-white ${getButtonClass()}`}
        >
            {isStreaming ? <Square className="w-4 h-4" /> : <Send className="w-4 h-4" />}
        </Button>
    );
}
