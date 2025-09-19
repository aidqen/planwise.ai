import { useState, useRef, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, AtSign } from 'lucide-react';
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
export function ChatInput({ activeToolName, onSubmit, status, stop, isLoading, error }) {
  const textareaRef = useRef(null);
  const [input, setInput] = useState('');
  const [isSingleLine, setIsSingleLine] = useState(true);

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
      // 48px baseline single-line height
      // setIsSingleLine(textarea.scrollHeight <= 48);
    }
  };

  function handleFormSubmit(e) {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    onSubmit(input);
    setInput('');
  }

  return (

    <form
      onSubmit={(e) => handleFormSubmit(e)}
      className={`sticky bottom-0 px-3 py-4 border-gray-200 backdrop-blur-sm transition-opacity duration-300 bg-white/50 dark:bg-gray-900/50 dark:border-gray-700`}
    >
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI anything..."
          className={`w-full md:text-xs lg:text-base text-sm placeholder:text-sm rounded-3xl border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 max-h-[20rem] min-h-[48px] pl-3 pr-[68px] transition-all duration-200 resize-none ${isSingleLine ? 'h-[48px] py-0 leading-[48px]' : 'py-2 leading-7'}`}
          style={{ height: 'auto', overflow: 'hidden' }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              handleFormSubmit(e);
            }
          }}
          rows={1}
        />
        <div className='buttons absolute bottom-2 right-2 flex flex-row items-center gap-2'>
          <AtSign className='w-5 h-5 text-black dark:text-white' />
          <ChatButton
            status={status}
            input={input}
            stop={stop}
            isLoading={isLoading}
          />
        </div>
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

