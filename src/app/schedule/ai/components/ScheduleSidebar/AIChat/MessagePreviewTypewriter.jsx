import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/services/utils';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '../ui/button';

export function TypewriterMessagePreview({
  content,
  role,
  mode = 'view',
  isStreaming = false,
  speed = 10,
}) {
  const [displayedContent, setDisplayedContent] = useState('');
  const intervalRef = useRef(null);

  useEffect(() => {
    // If not streaming or role is not assistant, show content immediately
    if (!isStreaming || role !== 'assistant') {
      setDisplayedContent(content);
      return;
    }

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // If content is shorter than what we're displaying, just update immediately
    if (content.length <= displayedContent.length) {
      setDisplayedContent(content);
      return;
    }

    // Start typewriter effect from where we left off
    let index = displayedContent.length;

    intervalRef.current = setInterval(() => {
      if (index < content.length) {
        setDisplayedContent(content.slice(0, index + 1));
        index++;
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, speed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [content, isStreaming, role, speed, displayedContent.length]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        data-testid={`message-${role}`}
        className="group/message mx-auto w-full max-w-4xl md:px-4"
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        data-role={role}
      >
        <div
          className={cn(
            'flex w-full gap-3 group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl md:gap-4',
            {
              'w-full': mode === 'edit',
              'group-data-[role=user]/message:w-fit': mode !== 'edit',
            }
          )}
        >
          {role === 'assistant' && (
            <div className="h-[27.5px] w-[27.5px] flex-shrink-0">
              <Button
                variant="outline"
                className="relative flex h-[27.5px] w-[27.5px] cursor-default items-center justify-center overflow-hidden rounded-full border-0 bg-[#0022FF] p-0 hover:bg-primary dark:border-surface md:h-[35px] md:w-[35px]"
              >
                <Image
                  src={'/assets/owl.png'}
                  alt="owl"
                  width={50}
                  height={50}
                  className="absolute top-1.5 rounded-full object-cover"
                />
              </Button>
            </div>
          )}

          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-row items-start gap-2">
              <div
                data-testid="message-content"
                className={cn('flex flex-col gap-4', {
                  'rounded-xl bg-primary px-3 py-2 text-primary-foreground dark:bg-[#303030] dark:text-gray-200':
                    role === 'user',
                })}
              >
                <div
                  className={cn(
                    'prose prose-sm max-w-none dark:prose-invert',
                    role === 'assistant'
                      ? 'text-slate-800 dark:text-gray-100'
                      : 'text-primary-foreground dark:text-gray-200'
                  )}
                >
                  <ReactMarkdown>{displayedContent}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}