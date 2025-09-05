import { useState, useRef, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from 'lucide-react';
import { ChatButton } from './ChatButton';

/**
 * ChatInput component for handling user input in the AI chat
 * @param {Object} props - Component props
 * @param {string} props.input - Current input value
 * @param {Function} props.setInput - Function to update input value
 * @param {Function} props.handleSubmit - Function to handle form submission
 * @param {string} props.status - Current chat status
 * @param {Function} props.stop - Function to stop chat generation
 * @param {boolean} props.isLoading - Whether the chat is loading
 * @param {Object} props.error - Error object if there is an error
 */
export function ChatInput({ input, setInput, handleSubmit, status, stop, isLoading, error }) {
  const textareaRef = useRef(null);
  
  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);
  
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };
  
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="sticky bottom-0 p-4 mt-auto border-t border-gray-200 backdrop-blur-sm transition-opacity duration-300 bg-white/50 dark:bg-gray-900/50 dark:border-gray-700"
    >
      <div className="flex gap-2 items-end">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI to modify your schedule..."
          className="flex-grow md:text-xs lg:text-sm text-sm rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 max-h-[20rem] min-h-[40px] px-3 py-2.5 transition-all duration-200 resize-none focus:border-blue-500 dark:focus:border-blue-400"
          style={{ height: 'auto', overflow: 'hidden' }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              handleSubmit(e);
            }
          }}
          rows={1}
        />
        <ChatButton
          status={status}
          input={input}
          stop={stop}
          isLoading={isLoading}
        />
      </div>
      {error && (
        <div className="mt-2 flex items-start text-sm text-red-500 dark:text-red-400">
          <AlertCircle className="min-w-4 min-h-4 max-w-4 max-h-4 mr-1 mt-0.5" />
          <span className="whitespace-pre-wrap flex items-start">
            {typeof error === 'object' ?
              (error.message || JSON.stringify(error, null, 2)) :
              String(error)}
          </span>
        </div>
      )}
    </form>
  );
}
