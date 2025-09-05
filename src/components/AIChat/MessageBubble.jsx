import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function MessageBubble({ message, type = 'regular' }) {
  const isUser = type === 'regular' && 
    (message?.role === 'user' || message?.type === 'user');
  
  // Get timestamp from message (supports both formats)
  const getTimestamp = () => {
    if (!isUser || type !== 'regular') return null;
    return message?.metadata?.timestamp || message?.timestamp || '';
  };

  // Define markdown components for consistent styling
  const markdownComponents = {
    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
    ul: ({ children }) => <ul className="mb-2 ml-4 list-disc">{children}</ul>,
    ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal">{children}</ol>,
    li: ({ children }) => <li className="mb-1">{children}</li>,
    code: ({ inline, children }) => inline
      ? <code className="px-1 text-gray-800 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-200">{children}</code>
      : <pre className="overflow-x-auto p-2 my-2 text-white bg-gray-800 rounded dark:bg-gray-900"><code>{children}</code></pre>,
    blockquote: ({ children }) => (
      <blockquote className="pl-4 my-2 italic border-l-4 border-gray-300 dark:border-gray-600">{children}</blockquote>
    ),
  };

  // Determine message bubble styling based on sender
  const bubbleClassName = `px-4 py-2 transition-opacity duration-300 ${isUser
    ? 'text-white bg-blue-500 rounded-2xl rounded-tr-sm dark:bg-blue-600'
    : 'text-gray-800 bg-gray-100 rounded-xl dark:text-gray-100 dark:bg-gray-800'
  } ${type === 'streaming' ? 'border-l-4 border-blue-500 dark:border-blue-400' : ''}`;

  // Streaming indicator for AI responses
  const StreamingIndicator = () => (
    <div className="flex gap-1 items-center mt-1 text-blue-500 dark:text-blue-400">
      <div className="w-1 h-1 bg-current rounded-full animate-pulse"></div>
      <div className="w-1 h-1 bg-current rounded-full delay-75 animate-pulse"></div>
      <div className="w-1 h-1 bg-current rounded-full delay-150 animate-pulse"></div>
    </div>
  );

  // Get message content based on format
  let messageContent = '';
  let textParts = [];
  
  if (type === 'streaming') {
    // Streaming messages are passed directly as text
    messageContent = message;
  } else if (message?.parts && Array.isArray(message.parts)) {
    // UIMessage format with parts array (AI SDK)
    textParts = message.parts.filter(part => part.type === 'text');
    // Only join for user messages, AI messages will render parts directly
    if (isUser) {
      messageContent = textParts.map(part => part.text).join('');
    }
  } else if (message?.text) {
    // Legacy format with direct text property
    messageContent = message.text;
  } else if (typeof message === 'string') {
    // Direct string message
    messageContent = message;
  }

  return (
    <div
      className={`flex flex-col gap-1 max-w-[85%] transition-all duration-300 ease-out transform ${isUser ? 'ml-auto translate-x-0 opacity-100' : 'mr-auto translate-x-0 opacity-100'}`}
    >
      <div className={bubbleClassName}>
        {isUser ? (
          <p className="text-xs whitespace-pre-wrap max-sm:text-sm lg:text-sm">{messageContent}</p>
        ) : (
          <div className="text-xs max-sm:text-sm lg:text-sm markdown-content">
            {/* For messages with parts array (AI SDK), render each part separately */}
            {type !== 'streaming' && message?.parts && Array.isArray(message.parts) ? (
              textParts.map((part, index) => (
                <ReactMarkdown key={index} remarkPlugins={[remarkGfm]} components={markdownComponents}>
                  {part.text}
                </ReactMarkdown>
              ))
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {messageContent}
              </ReactMarkdown>
            )}
            {type === 'streaming' && <StreamingIndicator />}
          </div>
        )}

        {/* Timestamp for user messages */}
        {getTimestamp() && (
          <span className="self-end text-xs text-blue-100">{getTimestamp()}</span>
        )}
      </div>
    </div>
  );
}
